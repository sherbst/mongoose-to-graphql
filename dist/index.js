/* IMPORT */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var mongoose_1 = require("mongoose");
/* MONGOOSE TO GRAPHQL */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7O0FBRVosMEJBQTRCO0FBQzVCLHFDQUFnQztBQUdoQyx5QkFBeUI7QUFFekIsSUFBTSxHQUFHLEdBQUc7SUFBVyxjQUFPO1NBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztRQUFQLHlCQUFPOztJQUU1QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sT0FBVixHQUFHLEVBQWEsSUFBSSxFQUFHO0FBRWhDLENBQXNCLENBQUM7QUFFdkIsWUFBWTtBQUVaLEdBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBVyxJQUFZLEVBQUUsTUFBbUI7SUFFdkQsRUFBRSxDQUFDLENBQUUsTUFBTSxZQUFZLGlCQUFPLENBQUM7UUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBRSxDQUFDO0lBRXZFLE1BQU0sQ0FBQyxVQUFRLElBQUksU0FBSSxHQUFHLENBQUMsV0FBVyxDQUFHLE1BQU0sQ0FBSSxDQUFDO0FBRXRELENBQUMsQ0FBQztBQUVGLFdBQVc7QUFFWCxHQUFHLENBQUMsS0FBSyxHQUFHLFVBQVksS0FBZTtJQUVyQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFFLENBQUM7QUFFNUQsQ0FBQyxDQUFDO0FBRUYsa0JBQWtCO0FBRWxCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsVUFBVyxHQUFPO0lBRWxDLElBQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztJQUUzQixHQUFHLENBQUMsQ0FBRSxJQUFJLEdBQUcsSUFBSSxHQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXRCLEVBQUUsQ0FBQyxDQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBRyxHQUFHLENBQUcsQ0FBQztZQUFD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