import { createBrowserRouter } from "react-router-dom";
import PrivateLayout from "../components/PrivateLayout";
import {
  ContactPage,
  LandingPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  SettingsPage,
} from "../pages";
import {
  landingAction,
  loginAction,
  logoutAction,
  messageAction,
  registerAction,
} from "../actions";
import {
  contactsLoader,
  currentUserLoader,
  messageLoader,
  userLoader,
} from "../loaders";
import RouteError from "../components/RouteError";
import SocketContextProvider from "../context/socketContext";
import { ConversationContent } from "../components/contactPage";

export const router = createBrowserRouter([
  {
    id: "root",
    loader: currentUserLoader,
    errorElement: <RouteError />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/",
            element: (
              <SocketContextProvider>
                <ContactPage />
              </SocketContextProvider>
            ),
            loader: contactsLoader,
            children: [
              {
                index: true,
                element: <div>Select a contact to start messaging</div>,
              },
              {
                path: ":id",
                element: <ConversationContent />,
                loader: messageLoader,
                action: messageAction,
              },
            ],
          },
          {
            path: "settings/:id",
            element: <SettingsPage />,
            loader: userLoader,
            children: [
              {
                index: true,
                element: <div>Settings Page</div>,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "landing",
    element: <LandingPage />,
    action: landingAction,
    loader: currentUserLoader,
  },
  {
    path: "login",
    element: <LoginPage />,
    loader: currentUserLoader,
    action: loginAction,
  },
  {
    path: "register",
    element: <RegisterPage />,
    loader: currentUserLoader,
    action: registerAction,
  },
  {
    path: "/logout",
    action: logoutAction,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
