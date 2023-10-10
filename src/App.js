import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import './App.css';
import { publicRoutes } from '~/routes/routes';
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout';

function App() {
    return (
        <Router>
            <div className="App"></div>
            <Routes>
                {publicRoutes.map((e, index) => {
                    let Layout = DefaultLayout;
                    if (e.layout) {
                        Layout = e.layout;
                    } else if (e.layout === null) {
                        Layout = Fragment;
                    }
                    const Page = e.component;
                    return (
                        <Route
                            key={index}
                            path={e.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
