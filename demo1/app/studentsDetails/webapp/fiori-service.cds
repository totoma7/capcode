using mysrvdemo as serviceStudent from '../../../srv/mysimplesrv';


annotate serviceStudent.StudentsSRV with @(
   UI:{
      SelectionFields  : [
          email
      ],
      LineItem:[
         {
            Label:'Email',
            Value:email,
         },
         {
            Label:'First_name',
            Value:first_name,
         },
         {
            Label:'Last_name',
            Value:last_name,
         },
         {
            Label:'Date Join',
            Value:date_sign_up,
         }
      ],
      HeaderInfo  : {
          $Type : 'UI.HeaderInfoType',
          TypeName : 'Student',
          TypeNamePlural : 'Students',
          Title:{
             Value: last_name
          },
          Description:{
             Value:first_name,
             Label:'first Name'
          }
      },
   }
);
