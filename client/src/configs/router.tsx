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
  editAction,
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
import { ConversationContent } from "../components/contactPage";
import { EditProfile, Profile } from "../components/settingsPage";
import { SocketContextProvider, UploadContextProvider } from "../contexts";

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
                <UploadContextProvider>
                  <ContactPage />
                </UploadContextProvider>
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
            id: "profile",
            path: "profile/:id",
            element: (
              <SocketContextProvider>
                <UploadContextProvider closeModalAfterSelect>
                  <SettingsPage />
                </UploadContextProvider>
              </SocketContextProvider>
            ),
            loader: userLoader,
            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                action: editAction,
                path: "edit",
                element: <EditProfile />,
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
