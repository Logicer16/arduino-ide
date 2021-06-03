import * as React from 'react';
import { inject, injectable, postConstruct } from 'inversify';
import { TreeNode } from '@theia/core/lib/browser/tree/tree';
import { CommandRegistry } from '@theia/core/lib/common/command';
import { NodeProps, TreeProps, TREE_NODE_SEGMENT_CLASS, TREE_NODE_TAIL_CLASS } from '@theia/core/lib/browser/tree/tree-widget';
import { EditorManager } from '@theia/editor/lib/browser/editor-manager';
import { FileTreeWidget } from '@theia/filesystem/lib/browser';
import { ContextMenuRenderer } from '@theia/core/lib/browser/context-menu-renderer';
import { SketchbookTree } from './sketchbook-tree';
import { SketchbookTreeModel } from './sketchbook-tree-model';
import { ArduinoPreferences } from '../../arduino-preferences';
import { SketchesServiceClientImpl } from '../../../common/protocol/sketches-service-client-impl';
import { SelectableTreeNode } from '@theia/core/lib/browser/tree/tree-selection';
import { Sketch } from '../../contributions/contribution';

@injectable()
export class SketchbookTreeWidget extends FileTreeWidget {

    @inject(CommandRegistry)
    protected readonly commandRegistry: CommandRegistry;

    @inject(ArduinoPreferences)
    protected readonly arduinoPreferences: ArduinoPreferences;

    @inject(SketchesServiceClientImpl)
    protected readonly sketchServiceClient: SketchesServiceClientImpl;

    private currentSketchUri = '';

    constructor(
        @inject(TreeProps) readonly props: TreeProps,
        @inject(SketchbookTreeModel) readonly model: SketchbookTreeModel,
        @inject(ContextMenuRenderer) readonly contextMenuRenderer: ContextMenuRenderer,
        @inject(EditorManager) readonly editorManager: EditorManager
    ) {
        super(props, model, contextMenuRenderer);
        this.id = 'arduino-sketchbook-tree-widget';
        this.title.iconClass = 'sketchbook-tree-icon';
        this.title.caption = 'Local Sketchbook';
        this.title.closable = false;
    }

    @postConstruct()
    protected async init(): Promise<void> {
        super.init();
        this.toDispose.push(this.arduinoPreferences.onPreferenceChanged(({ preferenceName }) => {
            if (preferenceName === 'arduino.sketchbook.showAllFiles') {
                this.updateModel();
            }
        }));
        this.updateModel();
        // cache the current open sketch uri
        const currentSketch = await this.sketchServiceClient.currentSketch();
        this.currentSketchUri = currentSketch && currentSketch.uri || '';
    }

    async updateModel(): Promise<void> {
        return this.model.updateRoot();
    }

    protected renderIcon(node: TreeNode, props: NodeProps): React.ReactNode {
        if (SketchbookTree.SketchDirNode.is(node) || Sketch.isSketchFile(node.id)) {
            return <div className='sketch-folder-icon file-icon'></div>;
        }
        const icon = this.toNodeIcon(node);
        if (icon) {
            return <div className={icon + ' file-icon'}></div>;
        }
        return undefined;
    }

    protected renderTailDecorations(node: TreeNode, props: NodeProps): React.ReactNode {
        return <React.Fragment>
            {super.renderTailDecorations(node, props)}
            {this.renderInlineCommands(node, props)}
        </React.Fragment>
    }

    protected hoveredNodeId: string | undefined;
    protected setHoverNodeId(id: string | undefined): void {
        this.hoveredNodeId = id;
        this.update();
    }

    protected createNodeAttributes(node: TreeNode, props: NodeProps): React.Attributes & React.HTMLAttributes<HTMLElement> {
        return {
            ...super.createNodeAttributes(node, props),
            draggable: false,
            onMouseOver: () => this.setHoverNodeId(node.id),
            onMouseOut: () => this.setHoverNodeId(undefined)
        };
    }

    protected renderInlineCommands(node: TreeNode, props: NodeProps): React.ReactNode {
        if (SketchbookTree.SketchDirNode.is(node) && (node.commands && node.id === this.hoveredNodeId || this.currentSketchUri === node?.uri.toString())) {
            return Array.from(new Set(node.commands)).map(command => this.renderInlineCommand(command.id, node));
        }
        return undefined;
    }

    protected renderInlineCommand(commandId: string, node: SketchbookTree.SketchDirNode): React.ReactNode {
        const command = this.commandRegistry.getCommand(commandId);
        const icon = command?.iconClass;
        const args = { model: this.model, node: node };
        if (command && icon && this.commandRegistry.isEnabled(commandId, args) && this.commandRegistry.isVisible(commandId, args)) {
            const className = [TREE_NODE_SEGMENT_CLASS, TREE_NODE_TAIL_CLASS, icon, 'theia-tree-view-inline-action'].join(' ');
            return <div
                key={`${commandId}--${node.id}`}
                className={className}
                title={command?.label || command.id}
                onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.commandRegistry.executeCommand(commandId, Object.assign(args, { event: event.nativeEvent }));
                }}
            />;
        }
        return undefined;
    }

    protected handleClickEvent(node: TreeNode | undefined, event: React.MouseEvent<HTMLElement>): void {

        if (node) {
            if (!!this.props.multiSelect) {
                const shiftMask = this.hasShiftMask(event);
                const ctrlCmdMask = this.hasCtrlCmdMask(event);
                if (SelectableTreeNode.is(node)) {
                    if (shiftMask) {
                        this.model.selectRange(node);
                    } else if (ctrlCmdMask) {
                        this.model.toggleNode(node);
                    } else {
                        this.model.selectNode(node);
                    }
                }
            } else {
                if (SelectableTreeNode.is(node)) {
                    this.model.selectNode(node);
                }
            }
            event.stopPropagation();
        }

    }

    protected doToggle(event: React.MouseEvent<HTMLElement>): void {

        const nodeId = event.currentTarget.getAttribute('data-node-id');
        if (nodeId) {
            const node = this.model.getNode(nodeId);
            if (node && this.isExpandable(node)) {
                this.model.toggleNodeExpansion(node);
            }
        }
        event.stopPropagation();
    }

}
