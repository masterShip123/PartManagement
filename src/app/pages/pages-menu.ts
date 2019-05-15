import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'E-commerce',
  //   icon: 'nb-e-commerce',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'nb-home',
  //   link: '/pages/iot-dashboard',
  // },
  // {
  //   title: 'PartMana',
  //   group: true,
  // },
  {
    title: 'Master',
    icon: 'nb-star',
    children: [
      {
        title: 'User',
        link: '/pages/master/user',
      },
      {
        title: 'UserType',
        link: '/pages/master/user-type',
      },
      {
        title: 'Section',
        link: '/pages/master/section',
      },
      {
        title: 'Department',
        link: '/pages/master/department',
      },{
        title: 'Factory',
        link: '/pages/master/factory',
      },{
        title: 'Production',
        link: '/pages/master/production',
      },{
        title: 'Machine',
        link: '/pages/master/machine',
      },{
        title: 'Request Type',
        link: '/pages/master/requestType',
        
      },{
        title: 'Check Tool',
        link: '/pages/master/checkTool',
        
      },{
        title: 'Location',
        link: '/pages/master/location',
      },{
        title: 'Maker',
        link: '/pages/master/maker',
      },{
        title: 'MoldType',
        link: '/pages/master/moldtype',
      },{
        title: 'PartMaster',
        link: '/pages/master/partMaster',
      },{
        title: 'UnitType',
        link: '/pages/master/unitType',
      }
    ],
  },
  // {
  //   title: 'Forms',
  //   icon: 'nb-compose',
  //   children: [
  //     {
  //       title: 'Form Inputs',
  //       link: '/pages/forms/inputs',
  //     },
  //     {
  //       title: 'Form Layouts',
  //       link: '/pages/forms/layouts',
  //     },
  //     {
  //       title: 'Buttons',
  //       link: '/pages/forms/buttons',
  //     },
  //     {
  //       title: 'Datepicker',
  //       link: '/pages/forms/datepicker',
  //     },
  //   ],
  // },
  {
    title: 'Information',
    icon: 'ion-information',
    children: [
      {
        title: 'Part Strock',
        link: '/pages/information/partStrock',
      }
    ],
  },
  // {
  //   title: 'Modal & Overlays',
  //   icon: 'nb-layout-default',
  //   children: [
  //     {
  //       title: 'Dialog',
  //       link: '/pages/modal-overlays/dialog',
  //     },
  //     {
  //       title: 'Window',
  //       link: '/pages/modal-overlays/window',
  //     },
  //     {
  //       title: 'Popover',
  //       link: '/pages/modal-overlays/popover',
  //     },
  //     {
  //       title: 'Toastr',
  //       link: '/pages/modal-overlays/toastr',
  //     },
  //     {
  //       title: 'Tooltip',
  //       link: '/pages/modal-overlays/tooltip',
  //     },
  //   ],
  // },
  // {
  //   title: 'Bootstrap',
  //   icon: 'nb-gear',
  //   children: [
  //     {
  //       title: 'Form Inputs',
  //       link: '/pages/bootstrap/inputs',
  //     },
  //     {
  //       title: 'Buttons',
  //       link: '/pages/bootstrap/buttons',
  //     },
  //     {
  //       title: 'Modal',
  //       link: '/pages/bootstrap/modal',
  //     },
  //   ],
  // },
  // {
  //   title: 'Maps',
  //   icon: 'nb-location',
  //   children: [
  //     {
  //       title: 'Google Maps',
  //       link: '/pages/maps/gmaps',
  //     },
  //     {
  //       title: 'Leaflet Maps',
  //       link: '/pages/maps/leaflet',
  //     },
  //     {
  //       title: 'Bubble Maps',
  //       link: '/pages/maps/bubble',
  //     },
  //     {
  //       title: 'Search Maps',
  //       link: '/pages/maps/searchmap',
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   icon: 'nb-bar-chart',
  //   children: [
  //     {
  //       title: 'Echarts',
  //       link: '/pages/charts/echarts',
  //     },
  //     {
  //       title: 'Charts.js',
  //       link: '/pages/charts/chartjs',
  //     },
  //     {
  //       title: 'D3',
  //       link: '/pages/charts/d3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: 'nb-title',
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: '/pages/editors/tinymce',
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: '/pages/editors/ckeditor',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tables',
  //   icon: 'nb-tables',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/pages/tables/smart-table',
  //     },
  //   ],
  // },
  // {
  //   title: 'Miscellaneous',
  //   icon: 'nb-shuffle',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
