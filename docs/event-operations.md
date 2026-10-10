# MADS event updates

The website event list lives in `data/site.ts`. The homepage automatically features the first future event from that list. Once an event ends, it moves from **Upcoming** to **Past events** on the Events page; it is no longer featured on the homepage. The site calendar keeps past events visible for reference.

The **MADS website editor** updates `data/site.ts`; the **MADS events officer** updates the separate public Google Calendar, **MADS | Official Events**, owned by `madsmalta@gmail.com`. The calendar is publicly readable, but the committee's internal calendar is separate. These two editors should cross-check title, date, Malta time, venue, status and any event-page link before publishing, and again whenever any detail changes. If one editor is unavailable, another committee member can perform the update, but both public surfaces must be checked. The website does not sync with Google automatically.

The site's **Follow our Google Calendar** link opens `/events/subscribe`. Google subscriptions must be added from a computer browser using the Google account that is also on the person's phone. The old direct subscription link sent iPhone visitors to an obsolete mobile web calendar without an add action. Apple/Outlook subscription is not advertised yet.

## Add or change an event

1. Confirm the title, Malta date and start time, venue, attendance or booking details, and any poster with the event organiser. Do not publish an unconfirmed finish time or booking link.
2. Add or update the entry in `publicEvents` in `data/site.ts`. Use Malta local time in `date` and `end` with the correct `utcOffset`: `+01:00` in winter or `+02:00` in summer. If the event crosses a daylight-saving change, check the rendered date and times carefully.
3. Add or update the matching event in the **public Google Calendar linked by `data/calendar.ts`**. Do not use the committee's internal calendar for the public subscription link. Make the public event's title, date, time, location and details agree with the website.
4. Check the homepage, Events list, calendar chip and event details page after publishing. Check the public Google Calendar subscription separately; the site calendar is populated from `data/site.ts` and does not sync automatically with Google.

## Cancel, postpone or archive

- Set `status` to `"Cancelled"` for a cancelled event. It appears under **Event updates** while its original date is ahead, with a cancellation label on the site calendar. Update the public Google Calendar entry too.
- Set `status` to `"Postponed"` when the date is no longer valid. It appears under **Event updates** and is omitted from the site calendar until a new date is confirmed. Update the public Google Calendar entry too.
- A completed event moves to **Past events** automatically after its end time. To remove an old event completely, delete its entry from `publicEvents` and review any links to its event page. Removing an event from the website does not remove its Google Calendar entry.

Before publishing a changed event, verify that its date, time and venue are confirmed by MADS and match the poster and public calendar.
