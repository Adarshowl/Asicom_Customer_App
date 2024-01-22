import {STRING} from '../constants';
import {COLORS} from '../constants/Colors';

export const sliderImage = [
  'https://images.pexels.com/photos/3987358/pexels-photo-3987358.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/5678044/pexels-photo-5678044.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/5677794/pexels-photo-5677794.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7890108/pexels-photo-7890108.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8889402/pexels-photo-8889402.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7223312/pexels-photo-7223312.jpeg?auto=compress&cs=tinysrgb&w=600',
];
export const tabData = [
  {
    id: 1,
    name: 'All',
    title: '5% off',
    select:true
  },

  {
    id: 2,
    name: 'Clothes',
    title: '10% off',
  },

  {
    id: 3,
    name: 'Shoes',
    title: '15% off',
  },

  {
    id: 4,
    name: 'Bags',
    title: '20% off',
  },
  {
    id: 5,
    name: 'Electronics',
    title: '25% off',
  },
  {
    id: 6,
    name: 'Watch',
    title: '30% off',
  },
  {
    id: 7,
    name: 'Jewelry',
    title: '35% off',
  },
  {
    id: 7,
    name: 'Toys',
    title: '35% off',
  },
];

export const flashTabData = [
  {
    id: 1,
    name: STRING.all,
    title: STRING.all,
  },

  {
    id: 2,
    name: STRING.received,
    title: STRING.received,
  },

  {
    id: 3,
    name: STRING.processed,
    title: STRING.processed,
  },

  {
    id: 4,
    name: STRING.shipped1,
    title: STRING.shipped1,
  },
  {
    id: 5,
    name: STRING.delivered1,
    title: STRING.delivered1,
  },
  {
    id: 6,
    name: STRING.cancelled1,
    title: STRING.cancelled1,
  },
  {
    id: 7,
    name: STRING.returned,
    title: STRING.returned,
  },
];

export const OrderData = [
  {
    status: STRING.received,
    bg_color: COLORS.received_status_bg,
    txt_color: COLORS.received_status_txt,
    id: '150',
    item: '10 items',
    amount: '102',
    product:
      'In publishing and graphic design, Lorem ipsum is a placeholder text',
    date: '25-02-2021',
  },
  {
    status: STRING.cancelled1,
    bg_color: COLORS.returned_and_cancel_status_bg,
    txt_color: COLORS.returned_and_cancel_status_txt,
    id: '151',
    item: '11 items',
    amount: '103',
    product: 'In ipsum is a placeholder text',
    date: '26-02-2022',
  },
  {
    status: STRING.processed,
    bg_color: COLORS.processed_status_bg,
    txt_color: COLORS.processed_status_txt,
    id: '153',
    item: '13 items',
    amount: '103',
    product: 'In graphic design, Lorem ipsum is a placeholder text',
    date: '05-02-2022',
  },
  {
    status: STRING.shipped1,
    bg_color: COLORS.shipped_status_bg,
    txt_color: COLORS.shipped_status_txt,
    id: '154',
    item: '3 items',
    amount: '108',
    product: 'In publishing and graphic design',
    date: '21-02-2022',
  },
  {
    status: STRING.delivered1,
    bg_color: COLORS.delivered_status_bg,
    txt_color: COLORS.delivered_status_txt,
    id: '110',
    item: '101 items',
    amount: '1002',
    product: 'In Lorem ipsum is a placeholder text',
    date: '21-02-2023',
  },
  {
    status: STRING.awaiting_payment_,
    bg_color: COLORS.awaiting_status_bg,
    txt_color: COLORS.awaiting_status_txt,
    id: '1570',
    item: '110 items',
    amount: '402',
    product: 'In and graphic design, Lorem ipsum is a placeholder text',
    date: '02-02-2021',
  },
  {
    status: STRING.received,
    bg_color: COLORS.received_status_bg,
    txt_color: COLORS.received_status_txt,
    id: '180',
    item: '80 items',
    amount: '182',
    product: 'In and graphic design, Lorem ipsum is a placeholder text',
    date: '22-02-2021',
  },
  {
    status: STRING.cancelled1,
    bg_color: COLORS.returned_and_cancel_status_bg,
    txt_color: COLORS.returned_and_cancel_status_txt,
    id: '1630',
    item: '198 items',
    amount: '185',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.processed,
    bg_color: COLORS.processed_status_bg,
    txt_color: COLORS.processed_status_txt,
    id: '1430',
    item: '198 items',
    amount: '64645',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.shipped1,
    bg_color: COLORS.shipped_status_bg,
    txt_color: COLORS.shipped_status_txt,
    id: '1730',
    item: '4 items',
    amount: '654',
    product: 'In fsdfsd',
    date: '45-02-2021',
  },
  {
    status: STRING.delivered1,
    bg_color: COLORS.delivered_status_bg,
    txt_color: COLORS.delivered_status_txt,
    id: '1130',
    item: '45 items',
    amount: '54',
    product: 'In fsdfdsfdsfds',
    date: '07-02-2021',
  },
  {
    status: STRING.awaiting_payment_,
    bg_color: COLORS.awaiting_status_bg,
    txt_color: COLORS.awaiting_status_txt,
    id: '180',
    item: '4654 items',
    amount: '54',
    product: 'In fdsfdsfds',
    date: '07-02-2021',
  },
];

export const OrderReceivedData = [
  {
    status: STRING.received,
    bg_color: COLORS.received_status_bg,
    txt_color: COLORS.received_status_txt,
    id: '1630',
    item: '198 items',
    amount: '185',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.received,
    bg_color: COLORS.received_status_bg,
    txt_color: COLORS.received_status_txt,
    id: '130',
    item: '78 items',
    amount: '15',
    product: 'In text',
    date: '07-02-2021',
  },
];

export const OrderProcessData = [
  {
    status: STRING.processed,
    bg_color: COLORS.processed_status_bg,
    txt_color: COLORS.processed_status_txt,
    id: '130',
    item: '78 items',
    amount: '15',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.processed,
    bg_color: COLORS.processed_status_bg,
    txt_color: COLORS.processed_status_txt,
    id: '1630',
    item: '198 items',
    amount: '185',
    product: 'In text',
    date: '07-02-2021',
  },
];

export const OrderShippedData = [
  {
    status: STRING.shipped1,
    bg_color: COLORS.shipped_status_bg,
    txt_color: COLORS.shipped_status_txt,
    id: '130',
    item: '78 items',
    amount: '15',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.shipped1,
    bg_color: COLORS.shipped_status_bg,
    txt_color: COLORS.shipped_status_txt,
    id: '1630',
    item: '198 items',
    amount: '185',
    product: 'In text',
    date: '07-02-2021',
  },
];

export const OrderDeliverData = [
  {
    status: STRING.delivered1,
    bg_color: COLORS.delivered_status_bg,
    txt_color: COLORS.delivered_status_txt,
    id: '130',
    item: '78 items',
    amount: '15',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.delivered1,
    bg_color: COLORS.delivered_status_bg,
    txt_color: COLORS.delivered_status_txt,
    id: '1630',
    item: '198 items',
    amount: '185',
    product: 'In text',
    date: '07-02-2021',
  },
];
export const OrderCancelReturnData = [
  {
    status: STRING.cancelled1,
    bg_color: COLORS.returned_and_cancel_status_bg,
    txt_color: COLORS.returned_and_cancel_status_txt,
    id: '130',
    item: '78 items',
    amount: '15',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.cancelled1,
    bg_color: COLORS.returned_and_cancel_status_bg,
    txt_color: COLORS.returned_and_cancel_status_txt,
    id: '1630',
    item: '198 items',
    amount: '185',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.cancelled1,
    bg_color: COLORS.returned_and_cancel_status_bg,
    txt_color: COLORS.returned_and_cancel_status_txt,
    id: '130',
    item: '78 items',
    amount: '15',
    product: 'In text',
    date: '07-02-2021',
  },
];

export const OrderReturnData = [
  {
    status: STRING.returned,
    bg_color: COLORS.returned_and_cancel_status_bg,
    txt_color: COLORS.returned_and_cancel_status_txt,
    id: '1630',
    item: '198 items',
    amount: '185',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.returned,
    bg_color: COLORS.returned_and_cancel_status_bg,
    txt_color: COLORS.returned_and_cancel_status_txt,
    id: '130',
    item: '78 items',
    amount: '15',
    product: 'In text',
    date: '07-02-2021',
  },
  {
    status: STRING.returned,
    bg_color: COLORS.returned_and_cancel_status_bg,
    txt_color: COLORS.returned_and_cancel_status_txt,
    id: '1630',
    item: '198 items',
    amount: '185',
    product: 'In text',
    date: '07-02-2021',
  },
];
