/**
 * Converts time units to a time stamp string in the specified format.
 * @param {number} timeUnits - The number of time units to convert to a time stamp.
 * @param {string} timeFormat - The format of the time stamp to return.
 * timeFormat can be one of the following:
 * - hh:mm:ss:ms
 * - mm:ss:ms
 * @returns {string} The time stamp string in the specified format.
 * @throws {Error} If the time format is invalid or incompatible with the time units, or if the time units are invalid.
 * @example <caption>Example usage of timeUnitsToTimeStamp.</caption>
 * // returns "00:00:10"
 * timeUnitsToTimeStamp(10);
 * // returns "00:00:10:5"
 * timeUnitsToTimeStamp(10.5);
 * // returns "00:16:40:5"
 * timeUnitsToTimeStamp(1000.5);
 */
const timeUnitsToTimeStamp = (timeUnits, timeFormat = "hh:mm:ss:ms") => {
  // lets write function defination

  const avialableTimeFormats = ["hh:mm:ss:ms", "mm:ss:ms"];
  // check if timeFormat is valid.
  if (!avialableTimeFormats.includes(timeFormat)) {
    throw new Error("Invalid time format");
  }

  // check if thimeUnits and timeFormat are compatible.
  if (timeUnits >= 3600 && timeFormat === "mm:ss:ms") {
    throw new Error("Invalid time format");
  }

  // timeUnits is not a Number or float of integer or negative value
  if (
    typeof timeUnits !== "number" ||
    "float" ||
    timeUnits % 1 !== 0 ||
    timeUnits < 0 ||
    timeUnits === NaN ||
    timeUnits === Infinity ||
    timeUnits === -Infinity ||
    timeUnits === null ||
    timeUnits === undefined
  ) {
    throw new Error("Invalid time units");
  }
  const time = parseInt(timeUnits);
  // if timeUnits is 0 return 0:00:00:000 or 0:00:000
  if (time === 0) {
    return timeFormat === "hh:mm:ss:ms" ? "00:00:00:000" : "00:00:000";
  }

  // if timeUnits is less than 1 second
  if (time < 1) {
    const ms = timeUnits.toString().split(".")[1];
    const msString = ms.padEnd(3, "0").substring(0, 3);
    return timeFormat === "hh:mm:ss:ms"
      ? `00:00:00:${msString}`
      : `00:00:${msString}`;
  }

  // if timeUnits is less than 1 minute
  if (time < 60) {
    // if timeUnits is an natural number
    if (time % 1 === 0) {
      const seconds = time.toString().padStart(2, "0");
      return timeFormat === "hh:mm:ss:ms"
        ? `00:00:${seconds}:000`
        : `00:${seconds}:000`;
    } else {
      const seconds = time.toString().split(".")[0];
      const ms = time.toString().split(".")[1];
      const msString = ms.padEnd(3, "0").substring(0, 3);
      return timeFormat === "hh:mm:ss:ms"
        ? `00:00:${seconds}:${msString}`
        : `00:${seconds}:${msString}`;
    }
  }

  // if timeUnits is less than 1 hour
  if (time < 3600) {
    // if timeUnits is an natural number
    if (time % 1 === 0) {
      const minutes = Math.floor(time / 60);
      const minutesString = minutes.toString().padStart(2, "0");
      const seconds = time % 60;
      const secondsString = seconds.toString().padStart(2, "0");
      return timeFormat === "hh:mm:ss:ms"
        ? `00:${minutesString}:${secondsString}:000`
        : `${minutesString}:${secondsString}:000`;
    } else {
      const ms = time.toString().split(".")[1];
      const msString = ms.padEnd(3, "0").substring(0, 3);
      const firstPart = time.toString().split(".")[0];
      const minutes = Math.floor(firstPart / 60);
      const minutesString = minutes.toString().padStart(2, "0");
      const seconds = firstPart % 60;
      const secondsString = seconds.toString().padStart(2, "0");
      return timeFormat === "hh:mm:ss:ms"
        ? `00:${minutesString}:${secondsString}:${msString}`
        : `${minutesString}:${secondsString}:${msString}`;
    }
  }

  // if timeUnits is greater than 1 hour
  if (time >= 3600) {
    // if timeUnits is an natural number
    if (time % 1 === 0) {
      const hours = Math.floor(time / 3600);
      const hoursString = hours.toString().padStart(2, "0");
      const minutes = Math.floor((time % 3600) / 60);
      const minutesString = minutes.toString().padStart(2, "0");
      const seconds = time % 60;
      const secondsString = seconds.toString().padStart(2, "0");
      return timeFormat === "hh:mm:ss:ms"
        ? `${hoursString}:${minutesString}:${secondsString}:000`
        : `${minutesString}:${secondsString}:000`;
    } else {
      const ms = time.toString().split(".")[1];
      const msString = ms.padEnd(3, "0").substring(0, 3);
      const firstPart = time.toString().split(".")[0];
      const hours = Math.floor(firstPart / 3600);
      const hoursString = hours.toString().padStart(2, "0");
      const minutes = Math.floor((firstPart % 3600) / 60);
      const minutesString = minutes.toString().padStart(2, "0");
      const seconds = firstPart % 60;
      const secondsString = seconds.toString().padStart(2, "0");
      return timeFormat === "hh:mm:ss:ms"
        ? `${hoursString}:${minutesString}:${secondsString}:${msString}`
        : `${minutesString}:${secondsString}:${msString}`;
    }
  }
};

/**
 * Converts time stamp string to time units.
 * @param {string} timeStamp - The time stamp string to convert to time units.
 * @returns {number} The time units.
 * @throws {Error} If the time stamp is invalid.
 * @example <caption>Example usage of timeStampToTimeUnits.</caption>
 * // returns 10
 * timeStampToTimeUnits("00:00:10");
 * // returns 10.5
 * timeStampToTimeUnits("00:00:10.5");
 * // returns 1000.5
 * timeStampToTimeUnits("00:16:40.5");
 */
const timeStampToTimeUnits = (timeStamp) => {
  // what if someone pass the timeStamp as 00:00:00:000 or 00:00:000
  if (timeStamp === "00:00:00:000" || timeStamp === "00:00:000") {
    return 0;
  }

  // if someone pass the timestamp with . or , then replace it with :
  const newTimeStamp = replaceDotAndComma(timeStamp);

  // check the timeStamp format
  const timeStampFormat = newTimeStamp.split(":").length;

  if (timeStampFormat !== 3 && timeStampFormat !== 4) {
    throw new Error("Invalid time stamp format");
  }
  // if length of timeStamp is 3
  if (timeStampFormat === 3) {
    const [minutes, seconds, milliseconds] = timeStamp.split(":").map(Number);
    return minutes * 60 + seconds + milliseconds / 1000;
  }
  // if length of timeStamp is 4
  else {
    const [hours, minutes, seconds, milliseconds] = timeStamp
      .split(":")
      .map(Number);
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
  }
};

/**
 * replaceDotAndComma function replace . and , with : in timestamp
 * @param {string} timestamp - timestamp string
 * @returns {string} timestamp with : instead of . and ,
 * @throws {Error} If the timestamp is invalid.
 * @example <caption>Example usage of replaceDotAndComma.</caption>
 * // returns 00:00:10
 * replaceDotAndComma("00,00.10");
 * // returns 00:00:10:5
 * replaceDotAndComma("00,00.10,5");
 */
const replaceDotAndComma = (timestamp) => {
  // first validate the timestamp
  // check for . and , in timestamp if any invalid character except : or numbers then throw error
  const validCharacters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ":",
    ".",
    ",",
  ];
  const timestampCharacters = timestamp.split("");
  // throw error if any invalid character is present
  const invalidCharacters = timestampCharacters.filter((character) => {
    return !validCharacters.includes(character);
  });
  if (invalidCharacters.length > 0) {
    throw new Error("Invalid timestamp");
  }
  const temp = timestamp.replace(".", ":");
  const newTimestamp = temp.replace(",", ":");
  const timestampFormat = newTimestamp.split(":");
  // if timestampFormat is not 3 or 4 then throw error
  if (timestampFormat.length !== 3 && timestampFormat.length !== 4) {
    throw new Error("Invalid timestamp");
  }

  // if timestampFormat is 4 then return 12 characters
  if (timestampFormat.length === 4) {
    // validate the timestamp format by checking if there is more the 2 characters in hh, mm, ss,  and more than 3 characters in ms
    const [hours, minutes, seconds, milliseconds] = newTimestamp.split(":");
    if (
      hours.length > 2 ||
      minutes.length > 2 ||
      seconds.length > 2 ||
      milliseconds.length > 3
    ) {
      throw new Error("Invalid timestamp");
    }
    // if there is less then 2 characters in hh, mm, ss,  and less than 3 characters in ms then add 0 in front of them
    const formattedTimestamp = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${milliseconds}`;
    return formattedTimestamp;
  }
  if (timestampFormat.length === 3) {
    // validate the timestamp format by checking if there is more the 2 characters in mm, ss,  and more than 3 characters in ms
    const [minutes, seconds, milliseconds] = newTimestamp.split(":");
    if (minutes.length > 2 || seconds.length > 2 || milliseconds.length > 3) {
      throw new Error("Invalid timestamp");
    }
    // if there is less then 2 characters in mm, ss,  and less than 3 characters in ms then add 0 in front of them
    const formattedTimestamp = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}:${milliseconds}`;
    return formattedTimestamp;
  }
};

/**
 * Converts pixel to time units.
 * @param {number} pixel - The pixel to convert to time units.
 * @param {number} visibleSecondsOnScreen - The number of seconds visible on the screen.
 * @returns {number} The time units.
 * @example <caption>Example usage of pixelToTime.</caption>
 * // returns 10
 * pixelToTime(100, 10);
 * // returns 10.5
 * pixelToTime(105, 10);
 */
const pixelToTime = (pixel, visibleSecondsOnScreen) => {
  const timeUnit = (pixel - 10) / visibleSecondsOnScreen;
  return timeUnit;
};

/**
 * Converts pixel to time stamp string.
 * @param {number} pixel - The pixel to convert to time stamp string.
 * @param {number} visibleSecondsOnScreen - The number of seconds visible on the screen.
 * @param {string} timeFormat - The format of the time stamp to return.
 * timeFormat can be one of the following:
 * - hh:mm:ss:ms
 * - mm:ss:ms
 * @returns {string} The time stamp string in the specified format.
 * @throws {Error} If the time format is invalid.
 * @example <caption>Example usage of pixelToTimeStamp.</caption>
 * // returns "00:00:10"
 * pixelToTimeStamp(100, 10);
 * // returns "00:00:10:5"
 * pixelToTimeStamp(105, 10);
 * // returns "00:16:40:5"
 * pixelToTimeStamp(1000.5, 10);
 */
const pixelToTimeStamp = (pixel, visibleSecondsOnScreen, timeFormat) => {
  const timeUnit = pixelToTime(pixel, visibleSecondsOnScreen);
  return timeUnitsToTimeStamp(timeUnit, timeFormat);
};

export default {
  timeUnitsToTimeStamp,
  timeStampToTimeUnits,
  pixelToTime,
  pixelToTimeStamp,
};
