"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertWhatsappNumber = convertWhatsappNumber;
/* eslint-disable @typescript-eslint/space-before-function-paren */
/**
 * Converts an international phone number to a local format.
 * If the phone number starts with a specified country code (with or without a leading "+"),
 * this function removes that code and prepends "0" in its place.
 *
 * For example:
 *   convertWhatsappNumber("6283345542222") returns "083345542222"
 *   convertWhatsappNumber("+6283345542222") returns "083345542222"
 *   convertWhatsappNumber("2348031234567", "234") returns "08031234567"
 *
 * @param phone - The international phone number as a string.
 * @param countryCode - The country code to be replaced (default: "62").
 * @returns The phone number converted to local format.
 */
function convertWhatsappNumber(phone, countryCode = '62') {
    // Remove any whitespace from the phone number
    phone = phone.trim();
    // Remove a leading '+' if present
    if (phone.startsWith('+')) {
        phone = phone.substring(1);
    }
    // Check if the phone starts with the specified country code.
    if (phone.startsWith(countryCode)) {
        return '0' + phone.slice(countryCode.length);
    }
    // If the phone number does not start with the country code, return as is.
    return phone;
}
