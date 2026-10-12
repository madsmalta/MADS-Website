# MADS event updates

The website event list lives in `data/site.ts`. The homepage automatically features the first future event from that list. Once an event ends, it moves from **Upcoming** to **Past events** on the Events page; it is no longer featured on the homepage. The site calendar keeps past events visible for reference.

The **MADS website editor** updates `data/site.ts`; the **MADS events officer** updates the separate public Google and Outlook calendars, both named **MADS | Official Events**. The Google calendar is owned by `madsmalta@gmail.com`. These public calendars are separate from the committee's internal calendar. Cross-check title, date, Malta time, venue, status and any event-page link on all three public surfaces before publishing, and again whenever any detail changes. The website and public calendars do not sync automatically.

The site's **Follow our calendar** link opens `/events/subscribe`. The Google button opens Google's subscription flow; a computer browser may be needed when the phone app does not show an Add option. The Outlook public HTML link lets visitors view events in a browser. Outlook's separate ICS link is for subscribing through **Add calendar → Subscribe from web**; merely opening the ICS file may create a one-time import. Published Outlook links are stored in `data/calendar.ts` and must be updated if the calendar is republished or its links are reset.

## Add or change an event

1. Confirm the title, Malta date and start time, venue, attendance or booking details, and any poster with the event organiser. Do not publish an unconfirmed finish time or booking link.
2. Add or update the entry in `publicEvents` in `data/site.ts`. Use Malta local time in `date` and `end` with the correct `utcOffset`: `+01:00` in winter or `+02:00` in summer. If the event crosses a daylight-saving change, check the rendered date and times carefully.
3. Add or update matching events in the **public Google and Outlook calendars linked by `data/calendar.ts`**. Do not use the committee's internal calendar for the public subscription links. Make each public event's title, date, time, location and details agree with the website, and check that reminder settings match MADS's current choice.
4. Check the homepage, Events list, calendar chip and event details page after publishing. Check both public calendar links separately; the site calendar is populated from `data/site.ts` and does not sync automatically with either provider.

## Cancel, postpone or archive

- Set `status` to `"Cancelled"` for a cancelled event. It appears under **Event updates** while its original date is ahead, with a cancellation label on the site calendar. Update both public calendar entries too.
- Set `status` to `"Postponed"` when the date is no longer valid. It appears under **Event updates** and is omitted from the site calendar until a new date is confirmed. Update both public calendar entries too.
- A completed event moves to **Past events** automatically after its end time. To remove an old event completely, delete its entry from `publicEvents` and review any links to its event page. Removing an event from the website does not remove either public calendar entry.

Before publishing a changed event, verify that its date, time and venue are confirmed by MADS and match the poster and public calendar.
