import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages';
import CreateGroupPage from './pages/groups/create';
import GroupByIdPage from './pages/groups/id';
import LinksPage from './pages/groups/links';
import CreateLinkPage from './pages/groups/links/create';
import CreateSubjectPage from './pages/groups/subjects/create';
import SubjectsPage from './pages/groups/subjects';
import SubjectByIdPage from './pages/groups/subjects/id';

function App() {
    return (
        <div style={{display: "flex", flexDirection: "column", padding: "5px"}}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/groups" element={<HomePage />} />
                    <Route path="/groups/create" element={<CreateGroupPage />} />
                    <Route path="/groups/:id" element={<GroupByIdPage />} />

                    <Route path="/groups/:groupId/links" element={<LinksPage />} />
                    <Route path="/groups/:groupId/links/create" element={<CreateLinkPage />} />

                    <Route path="/groups/:groupId/subjects" element={<SubjectsPage />} />
                    <Route path="/groups/:groupId/subjects/:id" element={<SubjectByIdPage />} />
                    <Route path="/groups/:groupId/subjects/create" element={<CreateSubjectPage />} />
                    <Route path="/groups/:groupId/subjects/:id/hometasks/create" element={<CreateSubjectPage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
