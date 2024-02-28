import "./styles.css";
import RRule from "rrule";
import { DateTime } from "luxon";

function computeRRule(str) {
  const rrule = RRule.fromString(str);
  let dates = rrule.all();

  dates = rrule
    .all()
    .map((date) =>
      DateTime.fromJSDate(date)
        .setZone("local", { keepLocalTime: true })
        .toJSDate()
    );

  return dates
    .map((date) => `<li>${date.toISOString()}</li>`)
    .reduce((prev, cur) => prev + cur);
}

document.getElementById("app").innerHTML = `
  <h4>UTC</h4>
  <ul>
    ${computeRRule(`DTSTART:20201012T080000Z
    RRULE:FREQ=WEEKLY;COUNT=4;INTERVAL=1`)}
  </ul>

  <h4>Timezone Europe/Brussels</h4>
  <ul>
    ${computeRRule(`DTSTART;TZID=Europe/Brussels:20201012T080000
    RRULE:FREQ=WEEKLY;COUNT=4;INTERVAL=1`)}
  </ul>
`;
