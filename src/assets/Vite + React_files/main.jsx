import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=f733c2cd"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=f733c2cd"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=f733c2cd"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import App from "/src/App.jsx";
import "/src/index.css?t=1721552651169";
import { createBrowserRouter, RouterProvider } from "/node_modules/.vite/deps/react-router-dom.js?v=f733c2cd";
import Home from "/src/pages/Home.jsx";
import Aboutus from "/src/pages/Aboutus.jsx";
import Contactus from "/src/pages/Contactus.jsx";
import Courses from "/src/pages/Courses.jsx?t=1721507520871";
import Login from "/src/pages/Login.jsx";
import Signup from "/src/pages/Signup.jsx";
import "/node_modules/slick-carousel/slick/slick.css";
import "/node_modules/slick-carousel/slick/slick-theme.css";
import { Provider } from "/node_modules/.vite/deps/react-redux.js?v=f733c2cd";
import store from "/src/Store/store.js";
import Protected from "/src/components/Protected.jsx";
import Coursepage from "/src/pages/Coursepage.jsx";
import Buycourse from "/src/pages/Buycourse.jsx";
import Dashboard from "/src/pages/Dashboard.jsx";
import Myprofile from "/src/pages/Myprofile.jsx";
import Settings from "/src/pages/Settings.jsx?t=1721552651169";
import Enrolledcourses from "/src/pages/Enrolledcourses.jsx";
import Mycourses from "/src/pages/Mycourses.jsx";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
        fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
        lineNumber: 28,
        columnNumber: 12
      }, this),
      children: [
        {
          path: "/",
          element: /* @__PURE__ */ jsxDEV(Home, {}, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 32,
            columnNumber: 14
          }, this)
        },
        {
          path: "buy-course/:id",
          element: /* @__PURE__ */ jsxDEV(Protected, { authentication: true, children: /* @__PURE__ */ jsxDEV(Buycourse, {}, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 38,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 37,
            columnNumber: 5
          }, this)
        },
        {
          path: "about",
          element: /* @__PURE__ */ jsxDEV(Aboutus, {}, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 44,
            columnNumber: 14
          }, this)
        },
        {
          path: "dashboard",
          element: /* @__PURE__ */ jsxDEV(Protected, { authentication: true, children: /* @__PURE__ */ jsxDEV(Dashboard, {}, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 50,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 49,
            columnNumber: 5
          }, this),
          children: [
            { path: "myprofile", element: /* @__PURE__ */ jsxDEV(Myprofile, {}, void 0, false, {
              fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
              lineNumber: 54,
              columnNumber: 35
            }, this) },
            {
              path: "setting",
              element: /* @__PURE__ */ jsxDEV(Settings, {}, void 0, false, {
                fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
                lineNumber: 57,
                columnNumber: 16
              }, this)
            },
            { path: "mycourses", element: /* @__PURE__ */ jsxDEV(Mycourses, {}, void 0, false, {
              fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
              lineNumber: 59,
              columnNumber: 35
            }, this) },
            {
              path: "enrolledcourses",
              element: /* @__PURE__ */ jsxDEV(Enrolledcourses, {}, void 0, false, {
                fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
                lineNumber: 62,
                columnNumber: 16
              }, this)
            }
          ]
        },
        {
          path: "contact",
          element: /* @__PURE__ */ jsxDEV(Contactus, {}, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 69,
            columnNumber: 14
          }, this)
        },
        {
          path: "courses",
          element: /* @__PURE__ */ jsxDEV(Courses, {}, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 73,
            columnNumber: 14
          }, this)
        },
        {
          path: "courses/:id",
          // Add dynamic route for course details
          element: /* @__PURE__ */ jsxDEV(Coursepage, {}, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 77,
            columnNumber: 14
          }, this)
        },
        {
          path: "login",
          element: /* @__PURE__ */ jsxDEV(Protected, { authentication: false, children: /* @__PURE__ */ jsxDEV(Login, {}, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 83,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 82,
            columnNumber: 5
          }, this)
        },
        {
          path: "signup",
          element: /* @__PURE__ */ jsxDEV(Protected, { authentication: false, children: /* @__PURE__ */ jsxDEV(Signup, {}, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 91,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
            lineNumber: 90,
            columnNumber: 5
          }, this)
        }
      ]
    }
  ]
);
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(Provider, { store, children: /* @__PURE__ */ jsxDEV(RouterProvider, { router }, void 0, false, {
    fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
    lineNumber: 101,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "C:/Users/siddh/Desktop/Edtech-frontend/src/main.jsx",
    lineNumber: 100,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBMkJhO0FBM0JiLE9BQU9BLFdBQVc7QUFDbEIsT0FBT0MsY0FBYztBQUNyQixPQUFPQyxTQUFTO0FBQ2hCLE9BQU87QUFDUCxTQUFTQyxxQkFBcUJDLHNCQUFzQjtBQUNwRCxPQUFPQyxVQUFVO0FBQ2pCLE9BQU9DLGFBQWE7QUFDcEIsT0FBT0MsZUFBZTtBQUN0QixPQUFPQyxhQUFhO0FBQ3BCLE9BQU9DLFdBQVc7QUFDbEIsT0FBT0MsWUFBWTtBQUNuQixPQUFPO0FBQ1AsT0FBTztBQUNQLFNBQVNDLGdCQUFnQjtBQUN6QixPQUFPQyxXQUFXO0FBQ2xCLE9BQU9DLGVBQWU7QUFDdEIsT0FBT0MsZ0JBQWdCO0FBQ3ZCLE9BQU9DLGVBQWU7QUFDdEIsT0FBT0MsZUFBZTtBQUN0QixPQUFPQyxlQUFlO0FBQ3RCLE9BQU9DLGNBQWM7QUFDckIsT0FBT0MscUJBQXFCO0FBQzVCLE9BQU9DLGVBQWU7QUFFdEIsTUFBTUMsU0FBU2xCO0FBQUFBLEVBQW9CO0FBQUEsSUFDakM7QUFBQSxNQUNFbUIsTUFBTTtBQUFBLE1BQ05DLFNBQVMsdUJBQUMsU0FBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQUk7QUFBQSxNQUNiQyxVQUFVO0FBQUEsUUFDUjtBQUFBLFVBQ0VGLE1BQU07QUFBQSxVQUNOQyxTQUFTLHVCQUFDLFVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBSztBQUFBLFFBQ2hCO0FBQUEsUUFDQTtBQUFBLFVBQ0VELE1BQU07QUFBQSxVQUNOQyxTQUNFLHVCQUFDLGFBQVUsZ0JBQWdCLE1BQ3pCLGlDQUFDLGVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBVSxLQURaO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxRQUVKO0FBQUEsUUFDQTtBQUFBLFVBQ0VELE1BQU07QUFBQSxVQUNOQyxTQUFTLHVCQUFDLGFBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBUTtBQUFBLFFBQ25CO0FBQUEsUUFDQTtBQUFBLFVBQ0VELE1BQU07QUFBQSxVQUNOQyxTQUNFLHVCQUFDLGFBQVUsZ0JBQWdCLE1BQ3pCLGlDQUFDLGVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBVSxLQURaO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUVGQyxVQUFVO0FBQUEsWUFDUixFQUFFRixNQUFNLGFBQWFDLFNBQVMsdUJBQUMsZUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFVLEVBQUk7QUFBQSxZQUM1QztBQUFBLGNBQ0VELE1BQU07QUFBQSxjQUNOQyxTQUFTLHVCQUFDLGNBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBUztBQUFBLFlBQ3BCO0FBQUEsWUFDQSxFQUFFRCxNQUFNLGFBQWFDLFNBQVMsdUJBQUMsZUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFVLEVBQUk7QUFBQSxZQUM1QztBQUFBLGNBQ0VELE1BQU07QUFBQSxjQUNOQyxTQUFTLHVCQUFDLHFCQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWdCO0FBQUEsWUFDM0I7QUFBQSxVQUFDO0FBQUEsUUFFTDtBQUFBLFFBRUE7QUFBQSxVQUNFRCxNQUFNO0FBQUEsVUFDTkMsU0FBUyx1QkFBQyxlQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQVU7QUFBQSxRQUNyQjtBQUFBLFFBQ0E7QUFBQSxVQUNFRCxNQUFNO0FBQUEsVUFDTkMsU0FBUyx1QkFBQyxhQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQVE7QUFBQSxRQUNuQjtBQUFBLFFBQ0E7QUFBQSxVQUNFRCxNQUFNO0FBQUE7QUFBQSxVQUNOQyxTQUFTLHVCQUFDLGdCQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQVc7QUFBQSxRQUN0QjtBQUFBLFFBQ0E7QUFBQSxVQUNFRCxNQUFNO0FBQUEsVUFDTkMsU0FDRSx1QkFBQyxhQUFVLGdCQUFnQixPQUN6QixpQ0FBQyxXQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQU0sS0FEUjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsUUFFSjtBQUFBLFFBQ0E7QUFBQSxVQUNFRCxNQUFNO0FBQUEsVUFDTkMsU0FDRSx1QkFBQyxhQUFVLGdCQUFnQixPQUN6QixpQ0FBQyxZQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQU8sS0FEVDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsUUFFSjtBQUFBLE1BQUM7QUFBQSxJQUVMO0FBQUEsRUFBQztBQUNGO0FBRUR0QixTQUFTd0IsV0FBV0MsU0FBU0MsZUFBZSxNQUFNLENBQUMsRUFBRUM7QUFBQUEsRUFDbkQsdUJBQUMsWUFBUyxPQUNSLGlDQUFDLGtCQUFlLFVBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBK0IsS0FEakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUVBO0FBQ0YiLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0RE9NIiwiQXBwIiwiY3JlYXRlQnJvd3NlclJvdXRlciIsIlJvdXRlclByb3ZpZGVyIiwiSG9tZSIsIkFib3V0dXMiLCJDb250YWN0dXMiLCJDb3Vyc2VzIiwiTG9naW4iLCJTaWdudXAiLCJQcm92aWRlciIsInN0b3JlIiwiUHJvdGVjdGVkIiwiQ291cnNlcGFnZSIsIkJ1eWNvdXJzZSIsIkRhc2hib2FyZCIsIk15cHJvZmlsZSIsIlNldHRpbmdzIiwiRW5yb2xsZWRjb3Vyc2VzIiwiTXljb3Vyc2VzIiwicm91dGVyIiwicGF0aCIsImVsZW1lbnQiLCJjaGlsZHJlbiIsImNyZWF0ZVJvb3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tL2NsaWVudFwiO1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAuanN4XCI7XG5pbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuaW1wb3J0IHsgY3JlYXRlQnJvd3NlclJvdXRlciwgUm91dGVyUHJvdmlkZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IEhvbWUgZnJvbSBcIi4vcGFnZXMvSG9tZS5qc3hcIjtcbmltcG9ydCBBYm91dHVzIGZyb20gXCIuL3BhZ2VzL0Fib3V0dXMuanN4XCI7XG5pbXBvcnQgQ29udGFjdHVzIGZyb20gXCIuL3BhZ2VzL0NvbnRhY3R1cy5qc3hcIjtcbmltcG9ydCBDb3Vyc2VzIGZyb20gXCIuL3BhZ2VzL0NvdXJzZXMuanN4XCI7XG5pbXBvcnQgTG9naW4gZnJvbSBcIi4vcGFnZXMvTG9naW4uanN4XCI7XG5pbXBvcnQgU2lnbnVwIGZyb20gXCIuL3BhZ2VzL1NpZ251cC5qc3hcIjtcbmltcG9ydCBcInNsaWNrLWNhcm91c2VsL3NsaWNrL3NsaWNrLmNzc1wiO1xuaW1wb3J0IFwic2xpY2stY2Fyb3VzZWwvc2xpY2svc2xpY2stdGhlbWUuY3NzXCI7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IHN0b3JlIGZyb20gXCIuL1N0b3JlL3N0b3JlLmpzXCI7XG5pbXBvcnQgUHJvdGVjdGVkIGZyb20gXCIuL2NvbXBvbmVudHMvUHJvdGVjdGVkLmpzeFwiO1xuaW1wb3J0IENvdXJzZXBhZ2UgZnJvbSBcIi4vcGFnZXMvQ291cnNlcGFnZS5qc3hcIjtcbmltcG9ydCBCdXljb3Vyc2UgZnJvbSBcIi4vcGFnZXMvQnV5Y291cnNlLmpzeFwiO1xuaW1wb3J0IERhc2hib2FyZCBmcm9tIFwiLi9wYWdlcy9EYXNoYm9hcmQuanN4XCI7XG5pbXBvcnQgTXlwcm9maWxlIGZyb20gXCIuL3BhZ2VzL015cHJvZmlsZS5qc3hcIjtcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi9wYWdlcy9TZXR0aW5ncy5qc3hcIjtcbmltcG9ydCBFbnJvbGxlZGNvdXJzZXMgZnJvbSBcIi4vcGFnZXMvRW5yb2xsZWRjb3Vyc2VzLmpzeFwiO1xuaW1wb3J0IE15Y291cnNlcyBmcm9tIFwiLi9wYWdlcy9NeWNvdXJzZXMuanN4XCI7XG5cbmNvbnN0IHJvdXRlciA9IGNyZWF0ZUJyb3dzZXJSb3V0ZXIoW1xuICB7XG4gICAgcGF0aDogXCIvXCIsXG4gICAgZWxlbWVudDogPEFwcCAvPixcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgICAgZWxlbWVudDogPEhvbWUgLz4sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcImJ1eS1jb3Vyc2UvOmlkXCIsXG4gICAgICAgIGVsZW1lbnQ6IChcbiAgICAgICAgICA8UHJvdGVjdGVkIGF1dGhlbnRpY2F0aW9uPXt0cnVlfT5cbiAgICAgICAgICAgIDxCdXljb3Vyc2UgLz5cbiAgICAgICAgICA8L1Byb3RlY3RlZD5cbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiYWJvdXRcIixcbiAgICAgICAgZWxlbWVudDogPEFib3V0dXMgLz4sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcImRhc2hib2FyZFwiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPFByb3RlY3RlZCBhdXRoZW50aWNhdGlvbj17dHJ1ZX0+XG4gICAgICAgICAgICA8RGFzaGJvYXJkIC8+XG4gICAgICAgICAgPC9Qcm90ZWN0ZWQ+XG4gICAgICAgICksXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgeyBwYXRoOiBcIm15cHJvZmlsZVwiLCBlbGVtZW50OiA8TXlwcm9maWxlIC8+IH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogXCJzZXR0aW5nXCIsXG4gICAgICAgICAgICBlbGVtZW50OiA8U2V0dGluZ3MgLz4sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IHBhdGg6IFwibXljb3Vyc2VzXCIsIGVsZW1lbnQ6IDxNeWNvdXJzZXMgLz4gfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBcImVucm9sbGVkY291cnNlc1wiLFxuICAgICAgICAgICAgZWxlbWVudDogPEVucm9sbGVkY291cnNlcyAvPixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICBwYXRoOiBcImNvbnRhY3RcIixcbiAgICAgICAgZWxlbWVudDogPENvbnRhY3R1cyAvPixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiY291cnNlc1wiLFxuICAgICAgICBlbGVtZW50OiA8Q291cnNlcyAvPixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiY291cnNlcy86aWRcIiwgLy8gQWRkIGR5bmFtaWMgcm91dGUgZm9yIGNvdXJzZSBkZXRhaWxzXG4gICAgICAgIGVsZW1lbnQ6IDxDb3Vyc2VwYWdlIC8+LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJsb2dpblwiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPFByb3RlY3RlZCBhdXRoZW50aWNhdGlvbj17ZmFsc2V9PlxuICAgICAgICAgICAgPExvZ2luIC8+XG4gICAgICAgICAgPC9Qcm90ZWN0ZWQ+XG4gICAgICAgICksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcInNpZ251cFwiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPFByb3RlY3RlZCBhdXRoZW50aWNhdGlvbj17ZmFsc2V9PlxuICAgICAgICAgICAgPFNpZ251cCAvPlxuICAgICAgICAgIDwvUHJvdGVjdGVkPlxuICAgICAgICApLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXSk7XG5cblJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpKS5yZW5kZXIoXG4gIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgIDxSb3V0ZXJQcm92aWRlciByb3V0ZXI9e3JvdXRlcn0gLz5cbiAgPC9Qcm92aWRlcj5cbik7XG4iXSwiZmlsZSI6IkM6L1VzZXJzL3NpZGRoL0Rlc2t0b3AvRWR0ZWNoLWZyb250ZW5kL3NyYy9tYWluLmpzeCJ9