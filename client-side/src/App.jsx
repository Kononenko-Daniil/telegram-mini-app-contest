import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages';
import CreateGroupPage from './pages/groups/create';
import GroupByIdPage from './pages/groups/id';

function App() {
    return (
        <div style={{display: "flex", flexDirection: "column", padding: "5px"}}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/groups" element={<HomePage />} />
                    <Route path="/groups/create" element={<CreateGroupPage />} />
                    <Route path="/groups/:id" element={<GroupByIdPage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
