import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Main } from './Pages/Home';
import { SideBar } from './Components/SideBar';
import { RootState, store } from './redux/store'
import { Provider, useSelector } from 'react-redux';
import { TodoList } from './Pages/TodoList';
import { api } from './redux/apiSlice';
import { CategoryList } from './Pages/CategoryList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SideBar />,
    children: [
      {
        path: 'categories/',
        element: <CategoryList />,
        loader: async ({ params }) => {
          const p = store.dispatch(api.endpoints.getCategories.initiate(params))
          try {
            const response = await p.unwrap();
            return response;
          } catch (error) {
            return error;
          } finally {
            p.unsubscribe()
          }
        }
      },
      {
        path: 'categories/:ID',
        element: <TodoList />,
        loader: async ({ params }) => {
          console.log(params.ID, 'id')
          const p = store.dispatch(api.endpoints.getCategoryByID.initiate(params.ID ?? ''))
          try {
            const response = await p.unwrap();
            console.log(response, 're')
            return response;
          } catch (error) {
            return error;
          } finally {
            p.unsubscribe()
          }
        },
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
