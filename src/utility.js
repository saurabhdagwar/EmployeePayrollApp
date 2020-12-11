const stringfyDate = (date) => {
    const options={day: 'numeric', month: 'numeric', year: 'numeric'};
    const newDate = !date ? "undeifined": new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}