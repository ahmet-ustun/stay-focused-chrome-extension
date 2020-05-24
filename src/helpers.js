import * as defaults from "./defaults";
import {localStorage, setExtensionIcon} from "./chromeApiHelpers";

export const resetChromeStorageData = () => {
    localStorage.set("sitesGroups", defaults.websitesListDefault);
    localStorage.set("settings", defaults.settingsDefault);
    localStorage.set("active", defaults.activeDefault);
}

export const isValidURL = str => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
/**
 * @param url {string}
 * @returns {string}
 */
export const getHostNameFromStringUrl = url => {
    let a = document.createElement("a");
    if (!url.startsWith("http")) {
        url = "http://" + url;
    }
    a.href = url;
    let hostName = a.hostname;
    if (hostName.startsWith("www.")) {
        hostName = hostName.substr(4);
    }
    return hostName;
}


/**
 *
 * @param startTime {string} // format "08:15 AM"
 * @param endTime {string} // format "08:15 AM"
 * @returns {boolean}
 */
export const isCurrentTimeBetweenTwoTimes = (startTime, endTime) => {
    let currentDate = new Date();
    const convertTimeToDate = timeString => {

        let timeAsDate = new Date(currentDate.getTime());
        timeAsDate.setHours(timeString.substring(0, 2));
        timeAsDate.setMinutes(timeString.substring(3, 5));
        timeAsDate.setSeconds(0);
        let isPM = timeString.substring(6, 8) === "PM";
        if (isPM) {
            timeAsDate.setHours(timeAsDate.getHours() + 12);
        }
        return timeAsDate
    }
    let startTimeAsDate = convertTimeToDate(startTime);
    let endTimeAsDate = convertTimeToDate(endTime);

    return startTimeAsDate < currentDate && endTimeAsDate > currentDate
}
export const setIcon = isActive => {
    let iconPath = isActive ? "/icons/icon_48_active.ico" : "/icons/icon_48_inactive.ico";
    setExtensionIcon(iconPath);
}

export const getFlatEnabledListOfWebsites = groupsList => {
    let flatList = [];
    groupsList.forEach(siteGroup => {
        if (siteGroup.groupEnabled) {
            flatList.push(...(siteGroup.sitesList.filter(site => site.enabled === true)))
        }
    });
    return flatList
}

