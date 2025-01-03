import { Notification } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export const notification = (type, params) => {

  
  <Notification type={type} header={params.header} placement={params.placement} closable>
  {params.description}
</Notification>
};


// import React from 'react';
// import { Notification, useToaster } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css';

// // Hook personalizado para notificações
// export const useNotification = () => {
//   const toaster = useToaster();

//   const notify = (type, params) => {
//     toaster.push(
//       <Notification
//         type={type}
//         header={params.header}
//         closable
//       >
//         {params.description}
//       </Notification>,
//       { placement: params.placement || 'topEnd' }
//     );
//   };

//   return notify;
// };