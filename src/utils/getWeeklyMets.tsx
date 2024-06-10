/* eslint-disable @typescript-eslint/no-loop-func */
import dayjs from 'dayjs';

export default function getTotalMetPerWeek(sessions) {
  let totalMetPerWeek = 0;

  const currentDate = dayjs();
  const currentDay = currentDate.day(); // sunday = 0, monday = 1
  const thisWeekStart = currentDate.subtract(currentDay, 'day');

  for (let i = 1; i < 8; i += 1) {
    // 0-7 sunday to monday, 1-8 monday to sunday
    const date = thisWeekStart.add(i, 'day');
    const formattedDate = date.format('YYYY-MM-DD');
    const sessionsForDate = sessions.filter(
      (session) => dayjs(session.date).format('YYYY-MM-DD') === formattedDate
    );

    sessionsForDate.forEach((session) => {
      const sessionMet = session.duration * session.activity_met;
      totalMetPerWeek += sessionMet;
    });
  }

  return totalMetPerWeek;
}
