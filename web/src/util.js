import { useNavigate } from "react-router";


export default {
    hourToMinutes: (hourMinute) => {
      const [hour, minutes] = hourMinute.split(':');
      return parseInt(parseInt(hour) * 60 + parseInt(minutes));
    }
  };