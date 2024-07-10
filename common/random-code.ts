export default function generateRandomCodeFromDate() {
    const date = new Date();
    
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month (from 0 to 11)
    const day = date.getDate().toString().padStart(2, '0'); // Day of the month
    
    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    
    // Combine components into a code (e.g., YYMMDD-randomNumber)
    const randomCode = `${year}${month}${day}-${randomNumber}`;
    
    return randomCode;
  }