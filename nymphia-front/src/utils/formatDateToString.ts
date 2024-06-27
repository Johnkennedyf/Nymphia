export const formatDateToString = (date: Date): string => {
	var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
	var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
	var yyyy = date.getFullYear();

	return `${dd}/${MM}/${yyyy}`;
}