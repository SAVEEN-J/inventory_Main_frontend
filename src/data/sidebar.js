
import { BiImageAdd } from "react-icons/bi";
import { FaQrcode ,FaPersonShelter } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";


const menu = [
  {
    title: "Dashboard",
    icon: <FaQrcode />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <FaPersonShelter />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaMessage />,
    path: "/contact-us",
  },
];

export default menu;
