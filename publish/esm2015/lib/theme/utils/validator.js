import { from, Observable } from 'rxjs';
/**
 * '_executeValidators' utility function
 *
 * Validates a control against an array of validators, and returns
 * an array of the same length containing a combination of error messages
 * (from invalid validators) and null values (from valid validators)
 *
 * //  { AbstractControl } control - control to validate
 * //  { IValidatorFn[] } validators - array of validators
 * //  { boolean } invert - invert?
 * // { PlainObject[] } - array of nulls and error message
 */
export function _executeValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
}
/**
 * '_executeAsyncValidators' utility function
 *
 * Validates a control against an array of async validators, and returns
 * an array of observabe results of the same length containing a combination of
 * error messages (from invalid validators) and null values (from valid ones)
 *
 * //  { AbstractControl } control - control to validate
 * //  { AsyncIValidatorFn[] } validators - array of async validators
 * //  { boolean } invert - invert?
 * //  - array of observable nulls and error message
 */
export function _executeAsyncValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
}
/**
 * '_mergeObjects' utility function
 *
 * Recursively Merges one or more objects into a single object with combined keys.
 * Automatically detects and ignores null and undefined inputs.
 * Also detects duplicated boolean 'not' keys and XORs their values.
 *
 * //  { PlainObject[] } objects - one or more objects to merge
 * // { PlainObject } - merged object
 */
export function _mergeObjects(...objects) {
    const mergedObject = {};
    for (const currentObject of objects) {
        if (isObject(currentObject)) {
            for (const key of Object.keys(currentObject)) {
                const currentValue = currentObject[key];
                const mergedValue = mergedObject[key];
                mergedObject[key] = !isDefined(mergedValue) ? currentValue :
                    key === 'not' && isBoolean(mergedValue, 'strict') &&
                        isBoolean(currentValue, 'strict') ? xor(mergedValue, currentValue) :
                        getType(mergedValue) === 'object' && getType(currentValue) === 'object' ?
                            _mergeObjects(mergedValue, currentValue) :
                            currentValue;
            }
        }
    }
    return mergedObject;
}
/**
 * '_mergeErrors' utility function
 *
 * Merges an array of objects.
 * Used for combining the validator errors returned from 'executeValidators'
 *
 * //  { PlainObject[] } arrayOfErrors - array of objects
 * // { PlainObject } - merged object, or null if no usable input objectcs
 */
export function _mergeErrors(arrayOfErrors) {
    const mergedErrors = _mergeObjects(...arrayOfErrors);
    return isEmpty(mergedErrors) ? null : mergedErrors;
}
/**
 * 'isDefined' utility function
 *
 * Checks if a variable contains a value of any type.
 * Returns true even for otherwise 'falsey' values of 0, '', and false.
 *
 * //   value - the value to check
 * // { boolean } - false if undefined or null, otherwise true
 */
export function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * 'hasValue' utility function
 *
 * Checks if a variable contains a value.
 * Returs false for null, undefined, or a zero-length strng, '',
 * otherwise returns true.
 * (Stricter than 'isDefined' because it also returns false for '',
 * though it stil returns true for otherwise 'falsey' values 0 and false.)
 *
 * //   value - the value to check
 * // { boolean } - false if undefined, null, or '', otherwise true
 */
export function hasValue(value) {
    return value !== undefined && value !== null && value !== '';
}
/**
 * 'isEmpty' utility function
 *
 * Similar to !hasValue, but also returns true for empty arrays and objects.
 *
 * //   value - the value to check
 * // { boolean } - false if undefined, null, or '', otherwise true
 */
export function isEmpty(value) {
    if (isArray(value)) {
        return !value.length;
    }
    if (isObject(value)) {
        return !Object.keys(value).length;
    }
    return value === undefined || value === null || value === '';
}
/**
 * 'isString' utility function
 *
 * Checks if a value is a string.
 *
 * //   value - the value to check
 * // { boolean } - true if string, false if not
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * 'isNumber' utility function
 *
 * Checks if a value is a regular number, numeric string, or JavaScript Date.
 *
 * //   value - the value to check
 * //  { any = false } strict - if truthy, also checks JavaScript tyoe
 * // { boolean } - true if number, false if not
 */
export function isNumber(value, strict = false) {
    if (strict && typeof value !== 'number') {
        return false;
    }
    return !isNaN(value) && value !== value / 0;
}
/**
 * 'isInteger' utility function
 *
 * Checks if a value is an integer.
 *
 * //   value - the value to check
 * //  { any = false } strict - if truthy, also checks JavaScript tyoe
 * // {boolean } - true if number, false if not
 */
export function isInteger(value, strict = false) {
    if (strict && typeof value !== 'number') {
        return false;
    }
    return !isNaN(value) && value !== value / 0 && value % 1 === 0;
}
/**
 * 'isBoolean' utility function
 *
 * Checks if a value is a boolean.
 *
 * //   value - the value to check
 * //  { any = null } option - if 'strict', also checks JavaScript type
 *                              if TRUE or FALSE, checks only for that value
 * // { boolean } - true if boolean, false if not
 */
export function isBoolean(value, option = null) {
    if (option === 'strict') {
        return value === true || value === false;
    }
    if (option === true) {
        return value === true || value === 1 || value === 'true' || value === '1';
    }
    if (option === false) {
        return value === false || value === 0 || value === 'false' || value === '0';
    }
    return value === true || value === 1 || value === 'true' || value === '1' ||
        value === false || value === 0 || value === 'false' || value === '0';
}
export function isFunction(item) {
    return typeof item === 'function';
}
export function isObject(item) {
    return item !== null && typeof item === 'object';
}
export function isArray(item) {
    return Array.isArray(item);
}
export function isDate(item) {
    return !!item && Object.prototype.toString.call(item) === '[object Date]';
}
export function isMap(item) {
    return !!item && Object.prototype.toString.call(item) === '[object Map]';
}
export function isSet(item) {
    return !!item && Object.prototype.toString.call(item) === '[object Set]';
}
export function isSymbol(item) {
    return typeof item === 'symbol';
}
/**
 * 'getType' function
 *
 * Detects the JSON Schema Type of a value.
 * By default, detects numbers and integers even if formatted as strings.
 * (So all integers are also numbers, and any number may also be a string.)
 * However, it only detects true boolean values (to detect boolean values
 * in non-boolean formats, use isBoolean() instead).
 *
 * If passed a second optional parameter of 'strict', it will only detect
 * numbers and integers if they are formatted as JavaScript numbers.
 *
 * Examples:
 * getType('10.5') = 'number'
 * getType(10.5) = 'number'
 * getType('10') = 'integer'
 * getType(10) = 'integer'
 * getType('true') = 'string'
 * getType(true) = 'boolean'
 * getType(null) = 'null'
 * getType({ }) = 'object'
 * getType([]) = 'array'
 *
 * getType('10.5', 'strict') = 'string'
 * getType(10.5, 'strict') = 'number'
 * getType('10', 'strict') = 'string'
 * getType(10, 'strict') = 'integer'
 * getType('true', 'strict') = 'string'
 * getType(true, 'strict') = 'boolean'
 *
 * //   value - value to check
 * //  { any = false } strict - if truthy, also checks JavaScript tyoe
 * // { SchemaType }
 */
export function getType(value, strict = false) {
    if (!isDefined(value)) {
        return 'null';
    }
    if (isArray(value)) {
        return 'array';
    }
    if (isObject(value)) {
        return 'object';
    }
    if (isBoolean(value, 'strict')) {
        return 'boolean';
    }
    if (isInteger(value, strict)) {
        return 'integer';
    }
    if (isNumber(value, strict)) {
        return 'number';
    }
    if (isString(value) || (!strict && isDate(value))) {
        return 'string';
    }
    return null;
}
/**
 * 'isType' function
 *
 * Checks wether an input (probably string) value contains data of
 * a specified JSON Schema type
 *
 * //  { PrimitiveValue } value - value to check
 * //  { SchemaPrimitiveType } type - type to check
 * // { boolean }
 */
export function isType(value, type) {
    switch (type) {
        case 'string':
            return isString(value) || isDate(value);
        case 'number':
            return isNumber(value);
        case 'integer':
            return isInteger(value);
        case 'boolean':
            return isBoolean(value);
        case 'null':
            return !hasValue(value);
        default:
            console.error(`isType error: "${type}" is not a recognized type.`);
            return null;
    }
}
/**
 * 'isPrimitive' function
 *
 * Checks wether an input value is a JavaScript primitive type:
 * string, number, boolean, or null.
 *
 * //   value - value to check
 * // { boolean }
 */
export function isPrimitive(value) {
    return (isString(value) || isNumber(value) ||
        isBoolean(value, 'strict') || value === null);
}
/**
 * 'toJavaScriptType' function
 *
 * Converts an input (probably string) value to a JavaScript primitive type -
 * 'string', 'number', 'boolean', or 'null' - before storing in a JSON object.
 *
 * Does not coerce values (other than null), and only converts the types
 * of values that would otherwise be valid.
 *
 * If the optional third parameter 'strictIntegers' is TRUE, and the
 * JSON Schema type 'integer' is specified, it also verifies the input value
 * is an integer and, if it is, returns it as a JaveScript number.
 * If 'strictIntegers' is FALSE (or not set) the type 'integer' is treated
 * exactly the same as 'number', and allows decimals.
 *
 * Valid Examples:
 * toJavaScriptType('10',   'number' ) = 10   // '10'   is a number
 * toJavaScriptType('10',   'integer') = 10   // '10'   is also an integer
 * toJavaScriptType( 10,    'integer') = 10   //  10    is still an integer
 * toJavaScriptType( 10,    'string' ) = '10' //  10    can be made into a string
 * toJavaScriptType('10.5', 'number' ) = 10.5 // '10.5' is a number
 *
 * Invalid Examples:
 * toJavaScriptType('10.5', 'integer') = null // '10.5' is not an integer
 * toJavaScriptType( 10.5,  'integer') = null //  10.5  is still not an integer
 *
 * //  { PrimitiveValue } value - value to convert
 * //  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - types to convert to
 * //  { boolean = false } strictIntegers - if FALSE, treat integers as numbers
 * // { PrimitiveValue }
 */
export function toJavaScriptType(value, types, strictIntegers = true) {
    if (!isDefined(value)) {
        return null;
    }
    if (isString(types)) {
        types = [types];
    }
    if (strictIntegers && inArray('integer', types)) {
        if (isInteger(value, 'strict')) {
            return value;
        }
        if (isInteger(value)) {
            return parseInt(value, 10);
        }
    }
    if (inArray('number', types) || (!strictIntegers && inArray('integer', types))) {
        if (isNumber(value, 'strict')) {
            return value;
        }
        if (isNumber(value)) {
            return parseFloat(value);
        }
    }
    if (inArray('string', types)) {
        if (isString(value)) {
            return value;
        }
        // If value is a date, and types includes 'string',
        // convert the date to a string
        if (isDate(value)) {
            return value.toISOString().slice(0, 10);
        }
        if (isNumber(value)) {
            return value.toString();
        }
    }
    // If value is a date, and types includes 'integer' or 'number',
    // but not 'string', convert the date to a number
    if (isDate(value) && (inArray('integer', types) || inArray('number', types))) {
        return value.getTime();
    }
    if (inArray('boolean', types)) {
        if (isBoolean(value, true)) {
            return true;
        }
        if (isBoolean(value, false)) {
            return false;
        }
    }
    return null;
}
/**
 * 'toSchemaType' function
 *
 * Converts an input (probably string) value to the "best" JavaScript
 * equivalent available from an allowed list of JSON Schema types, which may
 * contain 'string', 'number', 'integer', 'boolean', and/or 'null'.
 * If necssary, it does progressively agressive type coersion.
 * It will not return null unless null is in the list of allowed types.
 *
 * Number conversion examples:
 * toSchemaType('10', ['number','integer','string']) = 10 // integer
 * toSchemaType('10', ['number','string']) = 10 // number
 * toSchemaType('10', ['string']) = '10' // string
 * toSchemaType('10.5', ['number','integer','string']) = 10.5 // number
 * toSchemaType('10.5', ['integer','string']) = '10.5' // string
 * toSchemaType('10.5', ['integer']) = 10 // integer
 * toSchemaType(10.5, ['null','boolean','string']) = '10.5' // string
 * toSchemaType(10.5, ['null','boolean']) = true // boolean
 *
 * String conversion examples:
 * toSchemaType('1.5x', ['boolean','number','integer','string']) = '1.5x' // string
 * toSchemaType('1.5x', ['boolean','number','integer']) = '1.5' // number
 * toSchemaType('1.5x', ['boolean','integer']) = '1' // integer
 * toSchemaType('1.5x', ['boolean']) = true // boolean
 * toSchemaType('xyz', ['number','integer','boolean','null']) = true // boolean
 * toSchemaType('xyz', ['number','integer','null']) = null // null
 * toSchemaType('xyz', ['number','integer']) = 0 // number
 *
 * Boolean conversion examples:
 * toSchemaType('1', ['integer','number','string','boolean']) = 1 // integer
 * toSchemaType('1', ['number','string','boolean']) = 1 // number
 * toSchemaType('1', ['string','boolean']) = '1' // string
 * toSchemaType('1', ['boolean']) = true // boolean
 * toSchemaType('true', ['number','string','boolean']) = 'true' // string
 * toSchemaType('true', ['boolean']) = true // boolean
 * toSchemaType('true', ['number']) = 0 // number
 * toSchemaType(true, ['number','string','boolean']) = true // boolean
 * toSchemaType(true, ['number','string']) = 'true' // string
 * toSchemaType(true, ['number']) = 1 // number
 *
 * //  { PrimitiveValue } value - value to convert
 * //  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - allowed types to convert to
 * // { PrimitiveValue }
 */
export function toSchemaType(value, types) {
    if (!isArray(types)) {
        types = [types];
    }
    if (types.includes('null') && !hasValue(value)) {
        return null;
    }
    if (types.includes('boolean') && !isBoolean(value, 'strict')) {
        return value;
    }
    if (types.includes('integer')) {
        const testValue = toJavaScriptType(value, 'integer');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if (types.includes('number')) {
        const testValue = toJavaScriptType(value, 'number');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if ((isString(value) || isNumber(value, 'strict')) &&
        types.includes('string')) { // Convert number to string
        return toJavaScriptType(value, 'string');
    }
    if (types.includes('boolean') && isBoolean(value)) {
        return toJavaScriptType(value, 'boolean');
    }
    if (types.includes('string')) { // Convert null & boolean to string
        if (value === null) {
            return '';
        }
        const testValue = toJavaScriptType(value, 'string');
        if (testValue !== null) {
            return testValue;
        }
    }
    if ((types.includes('number') ||
        types.includes('integer'))) {
        if (value === true) {
            return 1;
        } // Convert boolean & null to number
        if (value === false || value === null || value === '') {
            return 0;
        }
    }
    if (types.includes('number')) { // Convert mixed string to number
        const testValue = parseFloat(value);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('integer')) { // Convert string or number to integer
        const testValue = parseInt(value, 10);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('boolean')) { // Convert anything to boolean
        return !!value;
    }
    if ((types.includes('number') ||
        types.includes('integer')) && !types.includes('null')) {
        return 0; // If null not allowed, return 0 for non-convertable values
    }
}
/**
 * 'isPromise' function
 *
 * //   object
 * // { boolean }
 */
export function isPromise(object) {
    return !!object && typeof object.then === 'function';
}
/**
 * 'isObservable' function
 *
 * //   object
 * // { boolean }
 */
export function isObservable(object) {
    return !!object && typeof object.subscribe === 'function';
}
/**
 * '_toPromise' function
 *
 * //  { object } object
 * // { Promise<any> }
 */
export function _toPromise(object) {
    return isPromise(object) ? object : object.toPromise();
}
/**
 * 'toObservable' function
 *
 * //  { object } object
 * // { Observable<any> }
 */
export function toObservable(object) {
    const observable = isPromise(object) ? from(object) : object;
    if (isObservable(observable)) {
        return observable;
    }
    console.error('toObservable error: Expected validator to return Promise or Observable.');
    return new Observable();
}
/**
 * 'inArray' function
 *
 * Searches an array for an item, or one of a list of items, and returns true
 * as soon as a match is found, or false if no match.
 *
 * If the optional third parameter allIn is set to TRUE, and the item to find
 * is an array, then the function returns true only if all elements from item
 * are found in the array list, and false if any element is not found. If the
 * item to find is not an array, setting allIn to TRUE has no effect.
 *
 * //  { any|any[] } item - the item to search for
 * //   array - the array to search
 * //  { boolean = false } allIn - if TRUE, all items must be in array
 * // { boolean } - true if item(s) in array, false otherwise
 */
export function inArray(item, array, allIn = false) {
    if (!isDefined(item) || !isArray(array)) {
        return false;
    }
    return isArray(item) ?
        item[allIn ? 'every' : 'some'](subItem => array.includes(subItem)) :
        array.includes(item);
}
/**
 * 'xor' utility function - exclusive or
 *
 * Returns true if exactly one of two values is truthy.
 *
 * //   value1 - first value to check
 * //   value2 - second value to check
 * // { boolean } - true if exactly one input value is truthy, false if not
 */
export function xor(value1, value2) {
    return (!!value1 && !value2) || (!value1 && !!value2);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctem9lcy9saWIvdGhlbWUvdXRpbHMvdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBZ0R4Qzs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sR0FBRyxLQUFLO0lBQ3BFLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEdBQUcsS0FBSztJQUN6RSxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsR0FBRyxPQUFPO0lBQ3RDLE1BQU0sWUFBWSxHQUFnQixFQUFHLENBQUM7SUFDdEMsS0FBSyxNQUFNLGFBQWEsSUFBSSxPQUFPLEVBQUU7UUFDbkMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDM0IsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUM1QyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsWUFBWSxDQUFDLEdB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QztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTTtJQUNoQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKlxyXG4gKiBWYWxpZGF0b3IgdXRpbGl0eSBmdW5jdGlvbiBsaWJyYXJ5OlxyXG4gKlxyXG4gKiBWYWxpZGF0b3IgYW5kIGVycm9yIHV0aWxpdGllczpcclxuICogICBfZXhlY3V0ZVZhbGlkYXRvcnMsIF9leGVjdXRlQXN5bmNWYWxpZGF0b3JzLCBfbWVyZ2VPYmplY3RzLCBfbWVyZ2VFcnJvcnNcclxuICpcclxuICogSW5kaXZpZHVhbCB2YWx1ZSBjaGVja2luZzpcclxuICogICBpc0RlZmluZWQsIGhhc1ZhbHVlLCBpc0VtcHR5XHJcbiAqXHJcbiAqIEluZGl2aWR1YWwgdHlwZSBjaGVja2luZzpcclxuICogICBpc1N0cmluZywgaXNOdW1iZXIsIGlzSW50ZWdlciwgaXNCb29sZWFuLCBpc0Z1bmN0aW9uLCBpc09iamVjdCwgaXNBcnJheSxcclxuICogICBpc01hcCwgaXNTZXQsIGlzUHJvbWlzZSwgaXNPYnNlcnZhYmxlXHJcbiAqXHJcbiAqIE11bHRpcGxlIHR5cGUgY2hlY2tpbmcgYW5kIGZpeGluZzpcclxuICogICBnZXRUeXBlLCBpc1R5cGUsIGlzUHJpbWl0aXZlLCB0b0phdmFTY3JpcHRUeXBlLCB0b1NjaGVtYVR5cGUsXHJcbiAqICAgX3RvUHJvbWlzZSwgdG9PYnNlcnZhYmxlXHJcbiAqXHJcbiAqIFV0aWxpdHkgZnVuY3Rpb25zOlxyXG4gKiAgIGluQXJyYXksIHhvclxyXG4gKlxyXG4gKiBUeXBlc2NyaXB0IHR5cGVzIGFuZCBpbnRlcmZhY2VzOlxyXG4gKiAgIFNjaGVtYVByaW1pdGl2ZVR5cGUsIFNjaGVtYVR5cGUsIEphdmFTY3JpcHRQcmltaXRpdmVUeXBlLCBKYXZhU2NyaXB0VHlwZSxcclxuICogICBQcmltaXRpdmVWYWx1ZSwgUGxhaW5PYmplY3QsIElWYWxpZGF0b3JGbiwgQXN5bmNJVmFsaWRhdG9yRm5cclxuICpcclxuICogTm90ZTogJ0lWYWxpZGF0b3JGbicgaXMgc2hvcnQgZm9yICdpbnZlcnRhYmxlIHZhbGlkYXRvciBmdW5jdGlvbicsXHJcbiAqICAgd2hpY2ggaXMgYSB2YWxpZGF0b3IgZnVuY3Rpb25zIHRoYXQgYWNjZXB0cyBhbiBvcHRpb25hbCBzZWNvbmRcclxuICogICBhcmd1bWVudCB3aGljaCwgaWYgc2V0IHRvIFRSVUUsIGNhdXNlcyB0aGUgdmFsaWRhdG9yIHRvIHBlcmZvcm1cclxuICogICB0aGUgb3Bwb3NpdGUgb2YgaXRzIG9yaWdpbmFsIGZ1bmN0aW9uLlxyXG4gKi9cclxuXHJcbmV4cG9ydCB0eXBlIFNjaGVtYVByaW1pdGl2ZVR5cGUgPVxyXG4gICdzdHJpbmcnIHwgJ251bWJlcicgfCAnaW50ZWdlcicgfCAnYm9vbGVhbicgfCAnbnVsbCc7XHJcbmV4cG9ydCB0eXBlIFNjaGVtYVR5cGUgPVxyXG4gICdzdHJpbmcnIHwgJ251bWJlcicgfCAnaW50ZWdlcicgfCAnYm9vbGVhbicgfCAnbnVsbCcgfCAnb2JqZWN0JyB8ICdhcnJheSc7XHJcbmV4cG9ydCB0eXBlIEphdmFTY3JpcHRQcmltaXRpdmVUeXBlID1cclxuICAnc3RyaW5nJyB8ICdudW1iZXInIHwgJ2Jvb2xlYW4nIHwgJ251bGwnIHwgJ3VuZGVmaW5lZCc7XHJcbmV4cG9ydCB0eXBlIEphdmFTY3JpcHRUeXBlID1cclxuICAnc3RyaW5nJyB8ICdudW1iZXInIHwgJ2Jvb2xlYW4nIHwgJ251bGwnIHwgJ3VuZGVmaW5lZCcgfCAnb2JqZWN0JyB8ICdhcnJheScgfFxyXG4gICdtYXAnIHwgJ3NldCcgfCAnYXJndW1lbnRzJyB8ICdkYXRlJyB8ICdlcnJvcicgfCAnZnVuY3Rpb24nIHwgJ2pzb24nIHxcclxuICAnbWF0aCcgfCAncmVnZXhwJzsgLy8gTm90ZTogdGhpcyBsaXN0IGlzIGluY29tcGxldGVcclxuZXhwb3J0IHR5cGUgUHJpbWl0aXZlVmFsdWUgPSBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuZXhwb3J0IGludGVyZmFjZSBQbGFpbk9iamVjdCB7IFtrOiBzdHJpbmddOiBhbnk7IH1cclxuXHJcbmV4cG9ydCB0eXBlIElWYWxpZGF0b3JGbiA9IChjOiBBYnN0cmFjdENvbnRyb2wsIGk/OiBib29sZWFuKSA9PiBQbGFpbk9iamVjdDtcclxuZXhwb3J0IHR5cGUgQXN5bmNJVmFsaWRhdG9yRm4gPSAoYzogQWJzdHJhY3RDb250cm9sLCBpPzogYm9vbGVhbikgPT4gYW55O1xyXG5cclxuLyoqXHJcbiAqICdfZXhlY3V0ZVZhbGlkYXRvcnMnIHV0aWxpdHkgZnVuY3Rpb25cclxuICpcclxuICogVmFsaWRhdGVzIGEgY29udHJvbCBhZ2FpbnN0IGFuIGFycmF5IG9mIHZhbGlkYXRvcnMsIGFuZCByZXR1cm5zXHJcbiAqIGFuIGFycmF5IG9mIHRoZSBzYW1lIGxlbmd0aCBjb250YWluaW5nIGEgY29tYmluYXRpb24gb2YgZXJyb3IgbWVzc2FnZXNcclxuICogKGZyb20gaW52YWxpZCB2YWxpZGF0b3JzKSBhbmQgbnVsbCB2YWx1ZXMgKGZyb20gdmFsaWQgdmFsaWRhdG9ycylcclxuICpcclxuICogLy8gIHsgQWJzdHJhY3RDb250cm9sIH0gY29udHJvbCAtIGNvbnRyb2wgdG8gdmFsaWRhdGVcclxuICogLy8gIHsgSVZhbGlkYXRvckZuW10gfSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9yc1xyXG4gKiAvLyAgeyBib29sZWFuIH0gaW52ZXJ0IC0gaW52ZXJ0P1xyXG4gKiAvLyB7IFBsYWluT2JqZWN0W10gfSAtIGFycmF5IG9mIG51bGxzIGFuZCBlcnJvciBtZXNzYWdlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHZhbGlkYXRvcnMsIGludmVydCA9IGZhbHNlKSB7XHJcbiAgcmV0dXJuIHZhbGlkYXRvcnMubWFwKHZhbGlkYXRvciA9PiB2YWxpZGF0b3IoY29udHJvbCwgaW52ZXJ0KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAnX2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMnIHV0aWxpdHkgZnVuY3Rpb25cclxuICpcclxuICogVmFsaWRhdGVzIGEgY29udHJvbCBhZ2FpbnN0IGFuIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvcnMsIGFuZCByZXR1cm5zXHJcbiAqIGFuIGFycmF5IG9mIG9ic2VydmFiZSByZXN1bHRzIG9mIHRoZSBzYW1lIGxlbmd0aCBjb250YWluaW5nIGEgY29tYmluYXRpb24gb2ZcclxuICogZXJyb3IgbWVzc2FnZXMgKGZyb20gaW52YWxpZCB2YWxpZGF0b3JzKSBhbmQgbnVsbCB2YWx1ZXMgKGZyb20gdmFsaWQgb25lcylcclxuICpcclxuICogLy8gIHsgQWJzdHJhY3RDb250cm9sIH0gY29udHJvbCAtIGNvbnRyb2wgdG8gdmFsaWRhdGVcclxuICogLy8gIHsgQXN5bmNJVmFsaWRhdG9yRm5bXSB9IHZhbGlkYXRvcnMgLSBhcnJheSBvZiBhc3luYyB2YWxpZGF0b3JzXHJcbiAqIC8vICB7IGJvb2xlYW4gfSBpbnZlcnQgLSBpbnZlcnQ/XHJcbiAqIC8vICAtIGFycmF5IG9mIG9ic2VydmFibGUgbnVsbHMgYW5kIGVycm9yIG1lc3NhZ2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycyhjb250cm9sLCB2YWxpZGF0b3JzLCBpbnZlcnQgPSBmYWxzZSkge1xyXG4gIHJldHVybiB2YWxpZGF0b3JzLm1hcCh2YWxpZGF0b3IgPT4gdmFsaWRhdG9yKGNvbnRyb2wsIGludmVydCkpO1xyXG59XHJcblxyXG4vKipcclxuICogJ19tZXJnZU9iamVjdHMnIHV0aWxpdHkgZnVuY3Rpb25cclxuICpcclxuICogUmVjdXJzaXZlbHkgTWVyZ2VzIG9uZSBvciBtb3JlIG9iamVjdHMgaW50byBhIHNpbmdsZSBvYmplY3Qgd2l0aCBjb21iaW5lZCBrZXlzLlxyXG4gKiBBdXRvbWF0aWNhbGx5IGRldGVjdHMgYW5kIGlnbm9yZXMgbnVsbCBhbmQgdW5kZWZpbmVkIGlucHV0cy5cclxuICogQWxzbyBkZXRlY3RzIGR1cGxpY2F0ZWQgYm9vbGVhbiAnbm90JyBrZXlzIGFuZCBYT1JzIHRoZWlyIHZhbHVlcy5cclxuICpcclxuICogLy8gIHsgUGxhaW5PYmplY3RbXSB9IG9iamVjdHMgLSBvbmUgb3IgbW9yZSBvYmplY3RzIHRvIG1lcmdlXHJcbiAqIC8vIHsgUGxhaW5PYmplY3QgfSAtIG1lcmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfbWVyZ2VPYmplY3RzKC4uLm9iamVjdHMpIHtcclxuICBjb25zdCBtZXJnZWRPYmplY3Q6IFBsYWluT2JqZWN0ID0geyB9O1xyXG4gIGZvciAoY29uc3QgY3VycmVudE9iamVjdCBvZiBvYmplY3RzKSB7XHJcbiAgICBpZiAoaXNPYmplY3QoY3VycmVudE9iamVjdCkpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY3VycmVudE9iamVjdCkpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjdXJyZW50T2JqZWN0W2tleV07XHJcbiAgICAgICAgY29uc3QgbWVyZ2VkVmFsdWUgPSBtZXJnZWRPYmplY3Rba2V5XTtcclxuICAgICAgICBtZXJnZWRPYmplY3Rba2V5XSA9ICFpc0RlZmluZWQobWVyZ2VkVmFsdWUpID8gY3VycmVudFZhbHVlIDpcclxuICAgICAgICAgIGtleSA9PT0gJ25vdCcgJiYgaXNCb29sZWFuKG1lcmdlZFZhbHVlLCAnc3RyaWN0JykgJiZcclxuICAgICAgICAgICAgaXNCb29sZWFuKGN1cnJlbnRWYWx1ZSwgJ3N0cmljdCcpID8geG9yKG1lcmdlZFZhbHVlLCBjdXJyZW50VmFsdWUpIDpcclxuICAgICAgICAgIGdldFR5cGUobWVyZ2VkVmFsdWUpID09PSAnb2JqZWN0JyAmJiBnZXRUeXBlKGN1cnJlbnRWYWx1ZSkgPT09ICdvYmplY3QnID9cclxuICAgICAgICAgICAgX21lcmdlT2JqZWN0cyhtZXJnZWRWYWx1ZSwgY3VycmVudFZhbHVlKSA6XHJcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWVyZ2VkT2JqZWN0O1xyXG59XHJcblxyXG4vKipcclxuICogJ19tZXJnZUVycm9ycycgdXRpbGl0eSBmdW5jdGlvblxyXG4gKlxyXG4gKiBNZXJnZXMgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cclxuICogVXNlZCBmb3IgY29tYmluaW5nIHRoZSB2YWxpZGF0b3IgZXJyb3JzIHJldHVybmVkIGZyb20gJ2V4ZWN1dGVWYWxpZGF0b3JzJ1xyXG4gKlxyXG4gKiAvLyAgeyBQbGFpbk9iamVjdFtdIH0gYXJyYXlPZkVycm9ycyAtIGFycmF5IG9mIG9iamVjdHNcclxuICogLy8geyBQbGFpbk9iamVjdCB9IC0gbWVyZ2VkIG9iamVjdCwgb3IgbnVsbCBpZiBubyB1c2FibGUgaW5wdXQgb2JqZWN0Y3NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfbWVyZ2VFcnJvcnMoYXJyYXlPZkVycm9ycykge1xyXG4gIGNvbnN0IG1lcmdlZEVycm9ycyA9IF9tZXJnZU9iamVjdHMoLi4uYXJyYXlPZkVycm9ycyk7XHJcbiAgcmV0dXJuIGlzRW1wdHkobWVyZ2VkRXJyb3JzKSA/IG51bGwgOiBtZXJnZWRFcnJvcnM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAnaXNEZWZpbmVkJyB1dGlsaXR5IGZ1bmN0aW9uXHJcbiAqXHJcbiAqIENoZWNrcyBpZiBhIHZhcmlhYmxlIGNvbnRhaW5zIGEgdmFsdWUgb2YgYW55IHR5cGUuXHJcbiAqIFJldHVybnMgdHJ1ZSBldmVuIGZvciBvdGhlcndpc2UgJ2ZhbHNleScgdmFsdWVzIG9mIDAsICcnLCBhbmQgZmFsc2UuXHJcbiAqXHJcbiAqIC8vICAgdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcclxuICogLy8geyBib29sZWFuIH0gLSBmYWxzZSBpZiB1bmRlZmluZWQgb3IgbnVsbCwgb3RoZXJ3aXNlIHRydWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsdWUpIHtcclxuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqICdoYXNWYWx1ZScgdXRpbGl0eSBmdW5jdGlvblxyXG4gKlxyXG4gKiBDaGVja3MgaWYgYSB2YXJpYWJsZSBjb250YWlucyBhIHZhbHVlLlxyXG4gKiBSZXR1cnMgZmFsc2UgZm9yIG51bGwsIHVuZGVmaW5lZCwgb3IgYSB6ZXJvLWxlbmd0aCBzdHJuZywgJycsXHJcbiAqIG90aGVyd2lzZSByZXR1cm5zIHRydWUuXHJcbiAqIChTdHJpY3RlciB0aGFuICdpc0RlZmluZWQnIGJlY2F1c2UgaXQgYWxzbyByZXR1cm5zIGZhbHNlIGZvciAnJyxcclxuICogdGhvdWdoIGl0IHN0aWwgcmV0dXJucyB0cnVlIGZvciBvdGhlcndpc2UgJ2ZhbHNleScgdmFsdWVzIDAgYW5kIGZhbHNlLilcclxuICpcclxuICogLy8gICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xyXG4gKiAvLyB7IGJvb2xlYW4gfSAtIGZhbHNlIGlmIHVuZGVmaW5lZCwgbnVsbCwgb3IgJycsIG90aGVyd2lzZSB0cnVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzVmFsdWUodmFsdWUpIHtcclxuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gJyc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAnaXNFbXB0eScgdXRpbGl0eSBmdW5jdGlvblxyXG4gKlxyXG4gKiBTaW1pbGFyIHRvICFoYXNWYWx1ZSwgYnV0IGFsc28gcmV0dXJucyB0cnVlIGZvciBlbXB0eSBhcnJheXMgYW5kIG9iamVjdHMuXHJcbiAqXHJcbiAqIC8vICAgdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcclxuICogLy8geyBib29sZWFuIH0gLSBmYWxzZSBpZiB1bmRlZmluZWQsIG51bGwsIG9yICcnLCBvdGhlcndpc2UgdHJ1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcclxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHsgcmV0dXJuICF2YWx1ZS5sZW5ndGg7IH1cclxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7IHJldHVybiAhT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aDsgfVxyXG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJztcclxufVxyXG5cclxuLyoqXHJcbiAqICdpc1N0cmluZycgdXRpbGl0eSBmdW5jdGlvblxyXG4gKlxyXG4gKiBDaGVja3MgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cclxuICpcclxuICogLy8gICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xyXG4gKiAvLyB7IGJvb2xlYW4gfSAtIHRydWUgaWYgc3RyaW5nLCBmYWxzZSBpZiBub3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xyXG59XHJcblxyXG4vKipcclxuICogJ2lzTnVtYmVyJyB1dGlsaXR5IGZ1bmN0aW9uXHJcbiAqXHJcbiAqIENoZWNrcyBpZiBhIHZhbHVlIGlzIGEgcmVndWxhciBudW1iZXIsIG51bWVyaWMgc3RyaW5nLCBvciBKYXZhU2NyaXB0IERhdGUuXHJcbiAqXHJcbiAqIC8vICAgdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcclxuICogLy8gIHsgYW55ID0gZmFsc2UgfSBzdHJpY3QgLSBpZiB0cnV0aHksIGFsc28gY2hlY2tzIEphdmFTY3JpcHQgdHlvZVxyXG4gKiAvLyB7IGJvb2xlYW4gfSAtIHRydWUgaWYgbnVtYmVyLCBmYWxzZSBpZiBub3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSwgc3RyaWN0OiBhbnkgPSBmYWxzZSkge1xyXG4gIGlmIChzdHJpY3QgJiYgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgeyByZXR1cm4gZmFsc2U7IH1cclxuICByZXR1cm4gIWlzTmFOKHZhbHVlKSAmJiB2YWx1ZSAhPT0gdmFsdWUgLyAwO1xyXG59XHJcblxyXG4vKipcclxuICogJ2lzSW50ZWdlcicgdXRpbGl0eSBmdW5jdGlvblxyXG4gKlxyXG4gKiBDaGVja3MgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxyXG4gKlxyXG4gKiAvLyAgIHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXHJcbiAqIC8vICB7IGFueSA9IGZhbHNlIH0gc3RyaWN0IC0gaWYgdHJ1dGh5LCBhbHNvIGNoZWNrcyBKYXZhU2NyaXB0IHR5b2VcclxuICogLy8ge2Jvb2xlYW4gfSAtIHRydWUgaWYgbnVtYmVyLCBmYWxzZSBpZiBub3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWUsIHN0cmljdDogYW55ID0gZmFsc2UpIHtcclxuICBpZiAoc3RyaWN0ICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgcmV0dXJuICFpc05hTih2YWx1ZSkgJiYgIHZhbHVlICE9PSB2YWx1ZSAvIDAgJiYgdmFsdWUgJSAxID09PSAwO1xyXG59XHJcblxyXG4vKipcclxuICogJ2lzQm9vbGVhbicgdXRpbGl0eSBmdW5jdGlvblxyXG4gKlxyXG4gKiBDaGVja3MgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXHJcbiAqXHJcbiAqIC8vICAgdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcclxuICogLy8gIHsgYW55ID0gbnVsbCB9IG9wdGlvbiAtIGlmICdzdHJpY3QnLCBhbHNvIGNoZWNrcyBKYXZhU2NyaXB0IHR5cGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBUUlVFIG9yIEZBTFNFLCBjaGVja3Mgb25seSBmb3IgdGhhdCB2YWx1ZVxyXG4gKiAvLyB7IGJvb2xlYW4gfSAtIHRydWUgaWYgYm9vbGVhbiwgZmFsc2UgaWYgbm90XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlLCBvcHRpb246IGFueSA9IG51bGwpIHtcclxuICBpZiAob3B0aW9uID09PSAnc3RyaWN0JykgeyByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlOyB9XHJcbiAgaWYgKG9wdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSAxIHx8IHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICcxJztcclxuICB9XHJcbiAgaWYgKG9wdGlvbiA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiB2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT09ICcwJztcclxuICB9XHJcbiAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSAxIHx8IHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICcxJyB8fFxyXG4gICAgdmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSAnZmFsc2UnIHx8IHZhbHVlID09PSAnMCc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ2Z1bmN0aW9uJztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpdGVtICE9PSBudWxsICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkoaXRlbTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaXRlbSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUoaXRlbTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuICEhaXRlbSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkgPT09ICdbb2JqZWN0IERhdGVdJztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTWFwKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAhIWl0ZW0gJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pID09PSAnW29iamVjdCBNYXBdJztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2V0KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAhIWl0ZW0gJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pID09PSAnW29iamVjdCBTZXRdJztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU3ltYm9sKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ3N5bWJvbCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAnZ2V0VHlwZScgZnVuY3Rpb25cclxuICpcclxuICogRGV0ZWN0cyB0aGUgSlNPTiBTY2hlbWEgVHlwZSBvZiBhIHZhbHVlLlxyXG4gKiBCeSBkZWZhdWx0LCBkZXRlY3RzIG51bWJlcnMgYW5kIGludGVnZXJzIGV2ZW4gaWYgZm9ybWF0dGVkIGFzIHN0cmluZ3MuXHJcbiAqIChTbyBhbGwgaW50ZWdlcnMgYXJlIGFsc28gbnVtYmVycywgYW5kIGFueSBudW1iZXIgbWF5IGFsc28gYmUgYSBzdHJpbmcuKVxyXG4gKiBIb3dldmVyLCBpdCBvbmx5IGRldGVjdHMgdHJ1ZSBib29sZWFuIHZhbHVlcyAodG8gZGV0ZWN0IGJvb2xlYW4gdmFsdWVzXHJcbiAqIGluIG5vbi1ib29sZWFuIGZvcm1hdHMsIHVzZSBpc0Jvb2xlYW4oKSBpbnN0ZWFkKS5cclxuICpcclxuICogSWYgcGFzc2VkIGEgc2Vjb25kIG9wdGlvbmFsIHBhcmFtZXRlciBvZiAnc3RyaWN0JywgaXQgd2lsbCBvbmx5IGRldGVjdFxyXG4gKiBudW1iZXJzIGFuZCBpbnRlZ2VycyBpZiB0aGV5IGFyZSBmb3JtYXR0ZWQgYXMgSmF2YVNjcmlwdCBudW1iZXJzLlxyXG4gKlxyXG4gKiBFeGFtcGxlczpcclxuICogZ2V0VHlwZSgnMTAuNScpID0gJ251bWJlcidcclxuICogZ2V0VHlwZSgxMC41KSA9ICdudW1iZXInXHJcbiAqIGdldFR5cGUoJzEwJykgPSAnaW50ZWdlcidcclxuICogZ2V0VHlwZSgxMCkgPSAnaW50ZWdlcidcclxuICogZ2V0VHlwZSgndHJ1ZScpID0gJ3N0cmluZydcclxuICogZ2V0VHlwZSh0cnVlKSA9ICdib29sZWFuJ1xyXG4gKiBnZXRUeXBlKG51bGwpID0gJ251bGwnXHJcbiAqIGdldFR5cGUoeyB9KSA9ICdvYmplY3QnXHJcbiAqIGdldFR5cGUoW10pID0gJ2FycmF5J1xyXG4gKlxyXG4gKiBnZXRUeXBlKCcxMC41JywgJ3N0cmljdCcpID0gJ3N0cmluZydcclxuICogZ2V0VHlwZSgxMC41LCAnc3RyaWN0JykgPSAnbnVtYmVyJ1xyXG4gKiBnZXRUeXBlKCcxMCcsICdzdHJpY3QnKSA9ICdzdHJpbmcnXHJcbiAqIGdldFR5cGUoMTAsICdzdHJpY3QnKSA9ICdpbnRlZ2VyJ1xyXG4gKiBnZXRUeXBlKCd0cnVlJywgJ3N0cmljdCcpID0gJ3N0cmluZydcclxuICogZ2V0VHlwZSh0cnVlLCAnc3RyaWN0JykgPSAnYm9vbGVhbidcclxuICpcclxuICogLy8gICB2YWx1ZSAtIHZhbHVlIHRvIGNoZWNrXHJcbiAqIC8vICB7IGFueSA9IGZhbHNlIH0gc3RyaWN0IC0gaWYgdHJ1dGh5LCBhbHNvIGNoZWNrcyBKYXZhU2NyaXB0IHR5b2VcclxuICogLy8geyBTY2hlbWFUeXBlIH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlKHZhbHVlLCBzdHJpY3Q6IGFueSA9IGZhbHNlKSB7XHJcbiAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSB7IHJldHVybiAnbnVsbCc7IH1cclxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHsgcmV0dXJuICdhcnJheSc7IH1cclxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7IHJldHVybiAnb2JqZWN0JzsgfVxyXG4gIGlmIChpc0Jvb2xlYW4odmFsdWUsICdzdHJpY3QnKSkgeyByZXR1cm4gJ2Jvb2xlYW4nOyB9XHJcbiAgaWYgKGlzSW50ZWdlcih2YWx1ZSwgc3RyaWN0KSkgeyByZXR1cm4gJ2ludGVnZXInOyB9XHJcbiAgaWYgKGlzTnVtYmVyKHZhbHVlLCBzdHJpY3QpKSB7IHJldHVybiAnbnVtYmVyJzsgfVxyXG4gIGlmIChpc1N0cmluZyh2YWx1ZSkgfHwgKCFzdHJpY3QgJiYgaXNEYXRlKHZhbHVlKSkpIHsgcmV0dXJuICdzdHJpbmcnOyB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAnaXNUeXBlJyBmdW5jdGlvblxyXG4gKlxyXG4gKiBDaGVja3Mgd2V0aGVyIGFuIGlucHV0IChwcm9iYWJseSBzdHJpbmcpIHZhbHVlIGNvbnRhaW5zIGRhdGEgb2ZcclxuICogYSBzcGVjaWZpZWQgSlNPTiBTY2hlbWEgdHlwZVxyXG4gKlxyXG4gKiAvLyAgeyBQcmltaXRpdmVWYWx1ZSB9IHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcclxuICogLy8gIHsgU2NoZW1hUHJpbWl0aXZlVHlwZSB9IHR5cGUgLSB0eXBlIHRvIGNoZWNrXHJcbiAqIC8vIHsgYm9vbGVhbiB9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlKHZhbHVlLCB0eXBlKSB7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICByZXR1cm4gaXNTdHJpbmcodmFsdWUpIHx8IGlzRGF0ZSh2YWx1ZSk7XHJcbiAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICByZXR1cm4gaXNOdW1iZXIodmFsdWUpO1xyXG4gICAgY2FzZSAnaW50ZWdlcic6XHJcbiAgICAgIHJldHVybiBpc0ludGVnZXIodmFsdWUpO1xyXG4gICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpO1xyXG4gICAgY2FzZSAnbnVsbCc6XHJcbiAgICAgIHJldHVybiAhaGFzVmFsdWUodmFsdWUpO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgY29uc29sZS5lcnJvcihgaXNUeXBlIGVycm9yOiBcIiR7dHlwZX1cIiBpcyBub3QgYSByZWNvZ25pemVkIHR5cGUuYCk7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqICdpc1ByaW1pdGl2ZScgZnVuY3Rpb25cclxuICpcclxuICogQ2hlY2tzIHdldGhlciBhbiBpbnB1dCB2YWx1ZSBpcyBhIEphdmFTY3JpcHQgcHJpbWl0aXZlIHR5cGU6XHJcbiAqIHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBvciBudWxsLlxyXG4gKlxyXG4gKiAvLyAgIHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcclxuICogLy8geyBib29sZWFuIH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xyXG4gIHJldHVybiAoaXNTdHJpbmcodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlKSB8fFxyXG4gICAgaXNCb29sZWFuKHZhbHVlLCAnc3RyaWN0JykgfHwgdmFsdWUgPT09IG51bGwpO1xyXG59XHJcblxyXG4vKipcclxuICogJ3RvSmF2YVNjcmlwdFR5cGUnIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIENvbnZlcnRzIGFuIGlucHV0IChwcm9iYWJseSBzdHJpbmcpIHZhbHVlIHRvIGEgSmF2YVNjcmlwdCBwcmltaXRpdmUgdHlwZSAtXHJcbiAqICdzdHJpbmcnLCAnbnVtYmVyJywgJ2Jvb2xlYW4nLCBvciAnbnVsbCcgLSBiZWZvcmUgc3RvcmluZyBpbiBhIEpTT04gb2JqZWN0LlxyXG4gKlxyXG4gKiBEb2VzIG5vdCBjb2VyY2UgdmFsdWVzIChvdGhlciB0aGFuIG51bGwpLCBhbmQgb25seSBjb252ZXJ0cyB0aGUgdHlwZXNcclxuICogb2YgdmFsdWVzIHRoYXQgd291bGQgb3RoZXJ3aXNlIGJlIHZhbGlkLlxyXG4gKlxyXG4gKiBJZiB0aGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyICdzdHJpY3RJbnRlZ2VycycgaXMgVFJVRSwgYW5kIHRoZVxyXG4gKiBKU09OIFNjaGVtYSB0eXBlICdpbnRlZ2VyJyBpcyBzcGVjaWZpZWQsIGl0IGFsc28gdmVyaWZpZXMgdGhlIGlucHV0IHZhbHVlXHJcbiAqIGlzIGFuIGludGVnZXIgYW5kLCBpZiBpdCBpcywgcmV0dXJucyBpdCBhcyBhIEphdmVTY3JpcHQgbnVtYmVyLlxyXG4gKiBJZiAnc3RyaWN0SW50ZWdlcnMnIGlzIEZBTFNFIChvciBub3Qgc2V0KSB0aGUgdHlwZSAnaW50ZWdlcicgaXMgdHJlYXRlZFxyXG4gKiBleGFjdGx5IHRoZSBzYW1lIGFzICdudW1iZXInLCBhbmQgYWxsb3dzIGRlY2ltYWxzLlxyXG4gKlxyXG4gKiBWYWxpZCBFeGFtcGxlczpcclxuICogdG9KYXZhU2NyaXB0VHlwZSgnMTAnLCAgICdudW1iZXInICkgPSAxMCAgIC8vICcxMCcgICBpcyBhIG51bWJlclxyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCcxMCcsICAgJ2ludGVnZXInKSA9IDEwICAgLy8gJzEwJyAgIGlzIGFsc28gYW4gaW50ZWdlclxyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCAxMCwgICAgJ2ludGVnZXInKSA9IDEwICAgLy8gIDEwICAgIGlzIHN0aWxsIGFuIGludGVnZXJcclxuICogdG9KYXZhU2NyaXB0VHlwZSggMTAsICAgICdzdHJpbmcnICkgPSAnMTAnIC8vICAxMCAgICBjYW4gYmUgbWFkZSBpbnRvIGEgc3RyaW5nXHJcbiAqIHRvSmF2YVNjcmlwdFR5cGUoJzEwLjUnLCAnbnVtYmVyJyApID0gMTAuNSAvLyAnMTAuNScgaXMgYSBudW1iZXJcclxuICpcclxuICogSW52YWxpZCBFeGFtcGxlczpcclxuICogdG9KYXZhU2NyaXB0VHlwZSgnMTAuNScsICdpbnRlZ2VyJykgPSBudWxsIC8vICcxMC41JyBpcyBub3QgYW4gaW50ZWdlclxyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCAxMC41LCAgJ2ludGVnZXInKSA9IG51bGwgLy8gIDEwLjUgIGlzIHN0aWxsIG5vdCBhbiBpbnRlZ2VyXHJcbiAqXHJcbiAqIC8vICB7IFByaW1pdGl2ZVZhbHVlIH0gdmFsdWUgLSB2YWx1ZSB0byBjb252ZXJ0XHJcbiAqIC8vICB7IFNjaGVtYVByaW1pdGl2ZVR5cGUgfCBTY2hlbWFQcmltaXRpdmVUeXBlW10gfSB0eXBlcyAtIHR5cGVzIHRvIGNvbnZlcnQgdG9cclxuICogLy8gIHsgYm9vbGVhbiA9IGZhbHNlIH0gc3RyaWN0SW50ZWdlcnMgLSBpZiBGQUxTRSwgdHJlYXQgaW50ZWdlcnMgYXMgbnVtYmVyc1xyXG4gKiAvLyB7IFByaW1pdGl2ZVZhbHVlIH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCB0eXBlcywgc3RyaWN0SW50ZWdlcnMgPSB0cnVlKSAge1xyXG4gIGlmICghaXNEZWZpbmVkKHZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxyXG4gIGlmIChpc1N0cmluZyh0eXBlcykpIHsgdHlwZXMgPSBbdHlwZXNdOyB9XHJcbiAgaWYgKHN0cmljdEludGVnZXJzICYmIGluQXJyYXkoJ2ludGVnZXInLCB0eXBlcykpIHtcclxuICAgIGlmIChpc0ludGVnZXIodmFsdWUsICdzdHJpY3QnKSkgeyByZXR1cm4gdmFsdWU7IH1cclxuICAgIGlmIChpc0ludGVnZXIodmFsdWUpKSB7IHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApOyB9XHJcbiAgfVxyXG4gIGlmIChpbkFycmF5KCdudW1iZXInLCB0eXBlcykgfHwgKCFzdHJpY3RJbnRlZ2VycyAmJiBpbkFycmF5KCdpbnRlZ2VyJywgdHlwZXMpKSkge1xyXG4gICAgaWYgKGlzTnVtYmVyKHZhbHVlLCAnc3RyaWN0JykpIHsgcmV0dXJuIHZhbHVlOyB9XHJcbiAgICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7IHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTsgfVxyXG4gIH1cclxuICBpZiAoaW5BcnJheSgnc3RyaW5nJywgdHlwZXMpKSB7XHJcbiAgICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7IHJldHVybiB2YWx1ZTsgfVxyXG4gICAgLy8gSWYgdmFsdWUgaXMgYSBkYXRlLCBhbmQgdHlwZXMgaW5jbHVkZXMgJ3N0cmluZycsXHJcbiAgICAvLyBjb252ZXJ0IHRoZSBkYXRlIHRvIGEgc3RyaW5nXHJcbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkgeyByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7IH1cclxuICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHsgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7IH1cclxuICB9XHJcbiAgLy8gSWYgdmFsdWUgaXMgYSBkYXRlLCBhbmQgdHlwZXMgaW5jbHVkZXMgJ2ludGVnZXInIG9yICdudW1iZXInLFxyXG4gIC8vIGJ1dCBub3QgJ3N0cmluZycsIGNvbnZlcnQgdGhlIGRhdGUgdG8gYSBudW1iZXJcclxuICBpZiAoaXNEYXRlKHZhbHVlKSAmJiAoaW5BcnJheSgnaW50ZWdlcicsIHR5cGVzKSB8fCBpbkFycmF5KCdudW1iZXInLCB0eXBlcykpKSB7XHJcbiAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpO1xyXG4gIH1cclxuICBpZiAoaW5BcnJheSgnYm9vbGVhbicsIHR5cGVzKSkge1xyXG4gICAgaWYgKGlzQm9vbGVhbih2YWx1ZSwgdHJ1ZSkpIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIGlmIChpc0Jvb2xlYW4odmFsdWUsIGZhbHNlKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAndG9TY2hlbWFUeXBlJyBmdW5jdGlvblxyXG4gKlxyXG4gKiBDb252ZXJ0cyBhbiBpbnB1dCAocHJvYmFibHkgc3RyaW5nKSB2YWx1ZSB0byB0aGUgXCJiZXN0XCIgSmF2YVNjcmlwdFxyXG4gKiBlcXVpdmFsZW50IGF2YWlsYWJsZSBmcm9tIGFuIGFsbG93ZWQgbGlzdCBvZiBKU09OIFNjaGVtYSB0eXBlcywgd2hpY2ggbWF5XHJcbiAqIGNvbnRhaW4gJ3N0cmluZycsICdudW1iZXInLCAnaW50ZWdlcicsICdib29sZWFuJywgYW5kL29yICdudWxsJy5cclxuICogSWYgbmVjc3NhcnksIGl0IGRvZXMgcHJvZ3Jlc3NpdmVseSBhZ3Jlc3NpdmUgdHlwZSBjb2Vyc2lvbi5cclxuICogSXQgd2lsbCBub3QgcmV0dXJuIG51bGwgdW5sZXNzIG51bGwgaXMgaW4gdGhlIGxpc3Qgb2YgYWxsb3dlZCB0eXBlcy5cclxuICpcclxuICogTnVtYmVyIGNvbnZlcnNpb24gZXhhbXBsZXM6XHJcbiAqIHRvU2NoZW1hVHlwZSgnMTAnLCBbJ251bWJlcicsJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAxMCAvLyBpbnRlZ2VyXHJcbiAqIHRvU2NoZW1hVHlwZSgnMTAnLCBbJ251bWJlcicsJ3N0cmluZyddKSA9IDEwIC8vIG51bWJlclxyXG4gKiB0b1NjaGVtYVR5cGUoJzEwJywgWydzdHJpbmcnXSkgPSAnMTAnIC8vIHN0cmluZ1xyXG4gKiB0b1NjaGVtYVR5cGUoJzEwLjUnLCBbJ251bWJlcicsJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAxMC41IC8vIG51bWJlclxyXG4gKiB0b1NjaGVtYVR5cGUoJzEwLjUnLCBbJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAnMTAuNScgLy8gc3RyaW5nXHJcbiAqIHRvU2NoZW1hVHlwZSgnMTAuNScsIFsnaW50ZWdlciddKSA9IDEwIC8vIGludGVnZXJcclxuICogdG9TY2hlbWFUeXBlKDEwLjUsIFsnbnVsbCcsJ2Jvb2xlYW4nLCdzdHJpbmcnXSkgPSAnMTAuNScgLy8gc3RyaW5nXHJcbiAqIHRvU2NoZW1hVHlwZSgxMC41LCBbJ251bGwnLCdib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXHJcbiAqXHJcbiAqIFN0cmluZyBjb252ZXJzaW9uIGV4YW1wbGVzOlxyXG4gKiB0b1NjaGVtYVR5cGUoJzEuNXgnLCBbJ2Jvb2xlYW4nLCdudW1iZXInLCdpbnRlZ2VyJywnc3RyaW5nJ10pID0gJzEuNXgnIC8vIHN0cmluZ1xyXG4gKiB0b1NjaGVtYVR5cGUoJzEuNXgnLCBbJ2Jvb2xlYW4nLCdudW1iZXInLCdpbnRlZ2VyJ10pID0gJzEuNScgLy8gbnVtYmVyXHJcbiAqIHRvU2NoZW1hVHlwZSgnMS41eCcsIFsnYm9vbGVhbicsJ2ludGVnZXInXSkgPSAnMScgLy8gaW50ZWdlclxyXG4gKiB0b1NjaGVtYVR5cGUoJzEuNXgnLCBbJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cclxuICogdG9TY2hlbWFUeXBlKCd4eXonLCBbJ251bWJlcicsJ2ludGVnZXInLCdib29sZWFuJywnbnVsbCddKSA9IHRydWUgLy8gYm9vbGVhblxyXG4gKiB0b1NjaGVtYVR5cGUoJ3h5eicsIFsnbnVtYmVyJywnaW50ZWdlcicsJ251bGwnXSkgPSBudWxsIC8vIG51bGxcclxuICogdG9TY2hlbWFUeXBlKCd4eXonLCBbJ251bWJlcicsJ2ludGVnZXInXSkgPSAwIC8vIG51bWJlclxyXG4gKlxyXG4gKiBCb29sZWFuIGNvbnZlcnNpb24gZXhhbXBsZXM6XHJcbiAqIHRvU2NoZW1hVHlwZSgnMScsIFsnaW50ZWdlcicsJ251bWJlcicsJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSAxIC8vIGludGVnZXJcclxuICogdG9TY2hlbWFUeXBlKCcxJywgWydudW1iZXInLCdzdHJpbmcnLCdib29sZWFuJ10pID0gMSAvLyBudW1iZXJcclxuICogdG9TY2hlbWFUeXBlKCcxJywgWydzdHJpbmcnLCdib29sZWFuJ10pID0gJzEnIC8vIHN0cmluZ1xyXG4gKiB0b1NjaGVtYVR5cGUoJzEnLCBbJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cclxuICogdG9TY2hlbWFUeXBlKCd0cnVlJywgWydudW1iZXInLCdzdHJpbmcnLCdib29sZWFuJ10pID0gJ3RydWUnIC8vIHN0cmluZ1xyXG4gKiB0b1NjaGVtYVR5cGUoJ3RydWUnLCBbJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cclxuICogdG9TY2hlbWFUeXBlKCd0cnVlJywgWydudW1iZXInXSkgPSAwIC8vIG51bWJlclxyXG4gKiB0b1NjaGVtYVR5cGUodHJ1ZSwgWydudW1iZXInLCdzdHJpbmcnLCdib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXHJcbiAqIHRvU2NoZW1hVHlwZSh0cnVlLCBbJ251bWJlcicsJ3N0cmluZyddKSA9ICd0cnVlJyAvLyBzdHJpbmdcclxuICogdG9TY2hlbWFUeXBlKHRydWUsIFsnbnVtYmVyJ10pID0gMSAvLyBudW1iZXJcclxuICpcclxuICogLy8gIHsgUHJpbWl0aXZlVmFsdWUgfSB2YWx1ZSAtIHZhbHVlIHRvIGNvbnZlcnRcclxuICogLy8gIHsgU2NoZW1hUHJpbWl0aXZlVHlwZSB8IFNjaGVtYVByaW1pdGl2ZVR5cGVbXSB9IHR5cGVzIC0gYWxsb3dlZCB0eXBlcyB0byBjb252ZXJ0IHRvXHJcbiAqIC8vIHsgUHJpbWl0aXZlVmFsdWUgfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvU2NoZW1hVHlwZSh2YWx1ZSwgdHlwZXMpIHtcclxuICBpZiAoIWlzQXJyYXkoPFNjaGVtYVByaW1pdGl2ZVR5cGU+dHlwZXMpKSB7XHJcbiAgICB0eXBlcyA9IDxTY2hlbWFQcmltaXRpdmVUeXBlW10+W3R5cGVzXTtcclxuICB9XHJcbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVsbCcpICYmICFoYXNWYWx1ZSh2YWx1ZSkpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdib29sZWFuJykgJiYgIWlzQm9vbGVhbih2YWx1ZSwgJ3N0cmljdCcpKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2ludGVnZXInKSkge1xyXG4gICAgY29uc3QgdGVzdFZhbHVlID0gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgJ2ludGVnZXInKTtcclxuICAgIGlmICh0ZXN0VmFsdWUgIT09IG51bGwpIHsgcmV0dXJuICt0ZXN0VmFsdWU7IH1cclxuICB9XHJcbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVtYmVyJykpIHtcclxuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdudW1iZXInKTtcclxuICAgIGlmICh0ZXN0VmFsdWUgIT09IG51bGwpIHsgcmV0dXJuICt0ZXN0VmFsdWU7IH1cclxuICB9XHJcbiAgaWYgKFxyXG4gICAgKGlzU3RyaW5nKHZhbHVlKSB8fCBpc051bWJlcih2YWx1ZSwgJ3N0cmljdCcpKSAmJlxyXG4gICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdzdHJpbmcnKVxyXG4gICkgeyAvLyBDb252ZXJ0IG51bWJlciB0byBzdHJpbmdcclxuICAgIHJldHVybiB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnc3RyaW5nJyk7XHJcbiAgfVxyXG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2Jvb2xlYW4nKSAmJiBpc0Jvb2xlYW4odmFsdWUpKSB7XHJcbiAgICByZXR1cm4gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgJ2Jvb2xlYW4nKTtcclxuICB9XHJcbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnc3RyaW5nJykpIHsgLy8gQ29udmVydCBudWxsICYgYm9vbGVhbiB0byBzdHJpbmdcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gJyc7IH1cclxuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdzdHJpbmcnKTtcclxuICAgIGlmICh0ZXN0VmFsdWUgIT09IG51bGwpIHsgcmV0dXJuIHRlc3RWYWx1ZTsgfVxyXG4gIH1cclxuICBpZiAoKFxyXG4gICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdudW1iZXInKSB8fFxyXG4gICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdpbnRlZ2VyJykpXHJcbiAgKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHsgcmV0dXJuIDE7IH0gLy8gQ29udmVydCBib29sZWFuICYgbnVsbCB0byBudW1iZXJcclxuICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7IHJldHVybiAwOyB9XHJcbiAgfVxyXG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ251bWJlcicpKSB7IC8vIENvbnZlcnQgbWl4ZWQgc3RyaW5nIHRvIG51bWJlclxyXG4gICAgY29uc3QgdGVzdFZhbHVlID0gcGFyc2VGbG9hdCg8c3RyaW5nPnZhbHVlKTtcclxuICAgIGlmICghIXRlc3RWYWx1ZSkgeyByZXR1cm4gdGVzdFZhbHVlOyB9XHJcbiAgfVxyXG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2ludGVnZXInKSkgeyAvLyBDb252ZXJ0IHN0cmluZyBvciBudW1iZXIgdG8gaW50ZWdlclxyXG4gICAgY29uc3QgdGVzdFZhbHVlID0gcGFyc2VJbnQoPHN0cmluZz52YWx1ZSwgMTApO1xyXG4gICAgaWYgKCEhdGVzdFZhbHVlKSB7IHJldHVybiB0ZXN0VmFsdWU7IH1cclxuICB9XHJcbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnYm9vbGVhbicpKSB7IC8vIENvbnZlcnQgYW55dGhpbmcgdG8gYm9vbGVhblxyXG4gICAgcmV0dXJuICEhdmFsdWU7XHJcbiAgfVxyXG4gIGlmICgoXHJcbiAgICAgICg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVtYmVyJykgfHxcclxuICAgICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdpbnRlZ2VyJylcclxuICAgICkgJiYgISg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVsbCcpXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gMDsgLy8gSWYgbnVsbCBub3QgYWxsb3dlZCwgcmV0dXJuIDAgZm9yIG5vbi1jb252ZXJ0YWJsZSB2YWx1ZXNcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAnaXNQcm9taXNlJyBmdW5jdGlvblxyXG4gKlxyXG4gKiAvLyAgIG9iamVjdFxyXG4gKiAvLyB7IGJvb2xlYW4gfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmplY3QpOiBvYmplY3QgaXMgUHJvbWlzZTxhbnk+IHtcclxuICByZXR1cm4gISFvYmplY3QgJiYgdHlwZW9mIG9iamVjdC50aGVuID09PSAnZnVuY3Rpb24nO1xyXG59XHJcblxyXG4vKipcclxuICogJ2lzT2JzZXJ2YWJsZScgZnVuY3Rpb25cclxuICpcclxuICogLy8gICBvYmplY3RcclxuICogLy8geyBib29sZWFuIH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc09ic2VydmFibGUob2JqZWN0KTogb2JqZWN0IGlzIE9ic2VydmFibGU8YW55PiB7XHJcbiAgcmV0dXJuICEhb2JqZWN0ICYmIHR5cGVvZiBvYmplY3Quc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nO1xyXG59XHJcblxyXG4vKipcclxuICogJ190b1Byb21pc2UnIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIC8vICB7IG9iamVjdCB9IG9iamVjdFxyXG4gKiAvLyB7IFByb21pc2U8YW55PiB9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX3RvUHJvbWlzZShvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG4gIHJldHVybiBpc1Byb21pc2Uob2JqZWN0KSA/IG9iamVjdCA6IG9iamVjdC50b1Byb21pc2UoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqICd0b09ic2VydmFibGUnIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIC8vICB7IG9iamVjdCB9IG9iamVjdFxyXG4gKiAvLyB7IE9ic2VydmFibGU8YW55PiB9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlKG9iamVjdCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgY29uc3Qgb2JzZXJ2YWJsZSA9IGlzUHJvbWlzZShvYmplY3QpID8gZnJvbShvYmplY3QpIDogb2JqZWN0O1xyXG4gIGlmIChpc09ic2VydmFibGUob2JzZXJ2YWJsZSkpIHsgcmV0dXJuIG9ic2VydmFibGU7IH1cclxuICBjb25zb2xlLmVycm9yKCd0b09ic2VydmFibGUgZXJyb3I6IEV4cGVjdGVkIHZhbGlkYXRvciB0byByZXR1cm4gUHJvbWlzZSBvciBPYnNlcnZhYmxlLicpO1xyXG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogJ2luQXJyYXknIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIFNlYXJjaGVzIGFuIGFycmF5IGZvciBhbiBpdGVtLCBvciBvbmUgb2YgYSBsaXN0IG9mIGl0ZW1zLCBhbmQgcmV0dXJucyB0cnVlXHJcbiAqIGFzIHNvb24gYXMgYSBtYXRjaCBpcyBmb3VuZCwgb3IgZmFsc2UgaWYgbm8gbWF0Y2guXHJcbiAqXHJcbiAqIElmIHRoZSBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIgYWxsSW4gaXMgc2V0IHRvIFRSVUUsIGFuZCB0aGUgaXRlbSB0byBmaW5kXHJcbiAqIGlzIGFuIGFycmF5LCB0aGVuIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgb25seSBpZiBhbGwgZWxlbWVudHMgZnJvbSBpdGVtXHJcbiAqIGFyZSBmb3VuZCBpbiB0aGUgYXJyYXkgbGlzdCwgYW5kIGZhbHNlIGlmIGFueSBlbGVtZW50IGlzIG5vdCBmb3VuZC4gSWYgdGhlXHJcbiAqIGl0ZW0gdG8gZmluZCBpcyBub3QgYW4gYXJyYXksIHNldHRpbmcgYWxsSW4gdG8gVFJVRSBoYXMgbm8gZWZmZWN0LlxyXG4gKlxyXG4gKiAvLyAgeyBhbnl8YW55W10gfSBpdGVtIC0gdGhlIGl0ZW0gdG8gc2VhcmNoIGZvclxyXG4gKiAvLyAgIGFycmF5IC0gdGhlIGFycmF5IHRvIHNlYXJjaFxyXG4gKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBhbGxJbiAtIGlmIFRSVUUsIGFsbCBpdGVtcyBtdXN0IGJlIGluIGFycmF5XHJcbiAqIC8vIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiBpdGVtKHMpIGluIGFycmF5LCBmYWxzZSBvdGhlcndpc2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbkFycmF5KGl0ZW0sIGFycmF5LCBhbGxJbiA9IGZhbHNlKSB7XHJcbiAgaWYgKCFpc0RlZmluZWQoaXRlbSkgfHwgIWlzQXJyYXkoYXJyYXkpKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gIHJldHVybiBpc0FycmF5KGl0ZW0pID9cclxuICAgIGl0ZW1bYWxsSW4gPyAnZXZlcnknIDogJ3NvbWUnXShzdWJJdGVtID0+IGFycmF5LmluY2x1ZGVzKHN1Ykl0ZW0pKSA6XHJcbiAgICBhcnJheS5pbmNsdWRlcyhpdGVtKTtcclxufVxyXG5cclxuLyoqXHJcbiAqICd4b3InIHV0aWxpdHkgZnVuY3Rpb24gLSBleGNsdXNpdmUgb3JcclxuICpcclxuICogUmV0dXJucyB0cnVlIGlmIGV4YWN0bHkgb25lIG9mIHR3byB2YWx1ZXMgaXMgdHJ1dGh5LlxyXG4gKlxyXG4gKiAvLyAgIHZhbHVlMSAtIGZpcnN0IHZhbHVlIHRvIGNoZWNrXHJcbiAqIC8vICAgdmFsdWUyIC0gc2Vjb25kIHZhbHVlIHRvIGNoZWNrXHJcbiAqIC8vIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiBleGFjdGx5IG9uZSBpbnB1dCB2YWx1ZSBpcyB0cnV0aHksIGZhbHNlIGlmIG5vdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHhvcih2YWx1ZTEsIHZhbHVlMikge1xyXG4gIHJldHVybiAoISF2YWx1ZTEgJiYgIXZhbHVlMikgfHwgKCF2YWx1ZTEgJiYgISF2YWx1ZTIpO1xyXG59XHJcbiJdfQ==