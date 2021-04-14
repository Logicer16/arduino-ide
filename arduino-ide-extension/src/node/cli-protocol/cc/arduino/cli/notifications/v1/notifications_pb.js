// source: cc/arduino/cli/notifications/v1/notifications.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest', null, global);
goog.exportSymbol('proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse', null, global);
goog.exportSymbol('proto.cc.arduino.cli.notifications.v1.Notification', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.repeatedFields_, null);
};
goog.inherits(proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.displayName = 'proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.displayName = 'proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    filterList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest;
  return proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<!proto.cc.arduino.cli.notifications.v1.Notification>} */ (reader.isDelimited() ? reader.readPackedEnum() : [reader.readEnum()]);
      for (var i = 0; i < values.length; i++) {
        msg.addFilter(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFilterList();
  if (f.length > 0) {
    writer.writePackedEnum(
      1,
      f
    );
  }
};


/**
 * repeated Notification filter = 1;
 * @return {!Array<!proto.cc.arduino.cli.notifications.v1.Notification>}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.prototype.getFilterList = function() {
  return /** @type {!Array<!proto.cc.arduino.cli.notifications.v1.Notification>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<!proto.cc.arduino.cli.notifications.v1.Notification>} value
 * @return {!proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest} returns this
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.prototype.setFilterList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!proto.cc.arduino.cli.notifications.v1.Notification} value
 * @param {number=} opt_index
 * @return {!proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest} returns this
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.prototype.addFilter = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest} returns this
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsRequest.prototype.clearFilterList = function() {
  return this.setFilterList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    notification: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse;
  return proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.cc.arduino.cli.notifications.v1.Notification} */ (reader.readEnum());
      msg.setNotification(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNotification();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional Notification notification = 1;
 * @return {!proto.cc.arduino.cli.notifications.v1.Notification}
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.prototype.getNotification = function() {
  return /** @type {!proto.cc.arduino.cli.notifications.v1.Notification} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.cc.arduino.cli.notifications.v1.Notification} value
 * @return {!proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse} returns this
 */
proto.cc.arduino.cli.notifications.v1.GetNotificationsResponse.prototype.setNotification = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * @enum {number}
 */
proto.cc.arduino.cli.notifications.v1.Notification = {
  NOTIFICATION_UNSPECIFIED: 0,
  NOTIFICATION_CORE_CHANGED: 1
};

goog.object.extend(exports, proto.cc.arduino.cli.notifications.v1);
