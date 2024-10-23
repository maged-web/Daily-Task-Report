export const formatDate = (dateString:string) => {
    return dateString + ':00.000Z';
};

export const calculateDurationInHours = (from:string, to:string) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    return (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60);
};


export const formatDateTimeUTC = (dateString: string) => {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
      return date.toLocaleString('en-US', options);
  };