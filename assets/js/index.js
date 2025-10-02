function getCurrentTimestamp() {
    const now = new Date();
    const hours24 = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const hours12 = (hours24 % 12) || 12;
    const ampm = hours24 >= 12 ? 'PM' : 'AM';

    document.getElementById('currentTimestamp').textContent = `${hours12}:${minutes} ${ampm}`;
}
