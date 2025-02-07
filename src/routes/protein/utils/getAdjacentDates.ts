export function getAdjacentDates(anchorDate: Date) {
	const prevDate = new Date(anchorDate);
	prevDate.setDate(anchorDate.getDate() + 1);
	const nextDate = new Date(anchorDate);
	prevDate.setDate(anchorDate.getDate() - 1);
	return [prevDate, nextDate];
}
