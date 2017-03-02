/* IMPORT */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var mongoose_1 = require("mongoose");
/* MONGOOSE TO GRAPHQL */
//TODO: Add support for { type: Something: ref: 'Model' }
var M2G = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return M2G.schema.apply(M2G, args);
};
/* SCHEMA */
M2G.schema = function (name, schema) {
    if (schema instanceof mongoose_1.Schema)
        return M2G.schema(name, schema.obj);
    return "type " + name + " " + M2G.plainObject(schema);
};
/* MODEL */
M2G.model = function (model) {
    return M2G.schema(model['modelName'], model['schema']);
};
/* PLAIN OBJECT */
M2G.plainObject = function (obj) {
    var types = [];
    for (var key in obj) {
        if (!obj.hasOwnProperty(key))
            continue;
        types.push(key + ": " + M2G.type(obj[key]));
    }
    return "{\n    " + types.join('\n') + "\n  }";
};
/* TYPE */
M2G.type = function (type) {
    var /*Mixed,*/ ObjectId = mongoose_1.Schema.Types.ObjectId;
    switch (type) {
        case String: return 'String';
        case Number: return 'Float'; //FIXME: What if we want an Int?
        case Date: return 'Date';
        // case Buffer: return; //TODO: Implement
        case Boolean: return 'Boolean';
        // case Mixed: return; //TODO: Implement
        case ObjectId: return 'ID';
        case Array: return '[]';
    }
    if (_.isString(type)) {
        return type;
    }
    else if (_.isArray(type)) {
        var converted = type.length ? M2G.type(type[0]) : '';
        return "[" + converted + "]";
    }
    else if (_.isPlainObject(type)) {
        if (type.hasOwnProperty('type')) {
            var required = !!type.required ? '!' : '', converted = M2G.type(type.type);
            return "" + converted + required;
        }
        else {
            return M2G.plainObject(type);
        }
    }
    else if (_.isFunction(type) && 'modelName' in type) {
        return type.modelName;
    }
    else if (type instanceof mongoose_1.Schema) {
        return M2G.plainObject(type['obj']);
    }
    throw new Error('[mongoose-to-graphql] Type conversion not supported');
};
/* EXPORT */
var schema = M2G.schema, model = M2G.model, plainObject = M2G.plainObject, type = M2G.type;
exports.schema = schema;
exports.model = model;
exports.plainObject = plainObject;
exports.type = type;
exports.default = M2G;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7O0FBRVosMEJBQTRCO0FBQzVCLHFDQUFnQztBQUdoQyx5QkFBeUI7QUFFekIseURBQXlEO0FBRXpELElBQU0sR0FBRyxHQUFHO0lBQVcsY0FBTztTQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87UUFBUCx5QkFBTzs7SUFFNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLE9BQVYsR0FBRyxFQUFhLElBQUksRUFBRztBQUVoQyxDQUFzQixDQUFDO0FBRXZCLFlBQVk7QUFFWixHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVcsSUFBWSxFQUFFLE1BQW1CO0lBRXZELEVBQUUsQ0FBQyxDQUFFLE1BQU0sWUFBWSxpQkFBTyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUUsQ0FBQztJQUV2RSxNQUFNLENBQUMsVUFBUSxJQUFJLFNBQUksR0FBRyxDQUFDLFdBQVcsQ0FBRyxNQUFNLENBQUksQ0FBQztBQUV0RCxDQUFDLENBQUM7QUFFRixXQUFXO0FBRVgsR0FBRyxDQUFDLEtBQUssR0FBRyxVQUFZLEtBQWU7SUFFckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBRSxDQUFDO0FBRTVELENBQUMsQ0FBQztBQUVGLGtCQUFrQjtBQUVsQixHQUFHLENBQUMsV0FBVyxHQUFHLFVBQVcsR0FBTztJQUVsQyxJQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7SUFFM0IsR0FBRyxDQUFDLENBQUUsSUFBSSxHQUFHLElBQUksR0FBSSxDQUFDLENBQUMsQ0FBQztRQUV0QixFQUFFLENBQUMsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUcsR0FBRyxD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