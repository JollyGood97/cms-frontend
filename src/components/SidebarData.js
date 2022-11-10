import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/products",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Contract Management",
    path: "/overview",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Users",
        path: "/overview/users",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Revenue",
        path: "/overview/revenue",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Resource Management",
    path: "/resources",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Human Resources",
        path: "/resources/human",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        cName: "sub-nav",
        subNav: [
          {
            title: "Employees",
            path: "/resources/human/employees",
            icon: <IoIcons.IoIosPaper />,
            cName: "sub-nav",
          },
          {
            title: "Leave Requests",
            path: "/resources/human/leave-requests",
            icon: <IoIcons.IoIosPaper />,
            cName: "sub-nav",
          },
          {
            title: "Site Requests",
            path: "/resources/human/site-requests",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "Engineering Corps",
            path: "/resources/human/corps",
            icon: <IoIcons.IoIosPaper />,
          },
        ],
      },

      {
        title: "Machinery",
        path: "/resources/machinery/machines",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        cName: "sub-nav",
        subNav: [
          {
            title: "Machines",
            path: "/resources/machinery/machines",
            icon: <IoIcons.IoIosPaper />,
            cName: "sub-nav",
          },
          {
            title: "Site Requests",
            path: "/resources/machinery/site-requests",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "Machinery Rentals",
            path: "/resources/machinery/rentals",
            icon: <IoIcons.IoIosPaper />,
          },
        ],
      },
    ],
  },
  {
    title: "Supply Management",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Message 1",
        path: "/messages/message1",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Message 2",
        path: "/messages/message2",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
];
