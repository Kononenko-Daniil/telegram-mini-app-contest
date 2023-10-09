import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateGroupPage from './pages/groups/create';
import GroupByIdPage from './pages/groups/id';
import LinksPage from './pages/groups/links';
import CreateLinkPage from './pages/groups/links/create';
import CreateSubjectPage from './pages/groups/subjects/create';
import SubjectsPage from './pages/groups/subjects';
import SubjectByIdPage from './pages/groups/subjects/id';
import CreateHometaskPage from './pages/groups/hometasks/create';
import HometaskByIdPage from './pages/groups/hometasks/id';
import HometasksPage from './pages/groups/hometasks';
import GroupsPage from './pages/groups';
import JoinGroupPage from './pages/groups/join';
import ParticipantsPage from './pages/groups/participants';

function App() {
    return (
        <div style={{display: "flex", flexDirection: "column", padding: "5px"}}>
            <Router>
                <Routes>
                    <Route path="/" element={<GroupsPage />} />
                    <Route path="/groups" element={<GroupsPage />} />
                    <Route path="/groups/create" element={<CreateGroupPage />} />
                    <Route path="/groups/join" element={<JoinGroupPage />} />
                    <Route path="/groups/:id" element={<GroupByIdPage />} />

                    <Route path="/groups/:groupId/participants" element={<ParticipantsPage />} />

                    <Route path="/groups/:groupId/links" element={<LinksPage />} />
                    <Route path="/groups/:groupId/links/create" element={<CreateLinkPage />} />

                    <Route path="/groups/:groupId/hometasks" element={<HometasksPage />} />
                    <Route path="/groups/:groupId/hometasks/:id" element={<HometaskByIdPage />} />

                    <Route path="/groups/:groupId/subjects" element={<SubjectsPage />} />
                    <Route path="/groups/:groupId/subjects/:id" element={<SubjectByIdPage />} />
                    <Route path="/groups/:groupId/subjects/create" element={<CreateSubjectPage />} />
                    <Route path="/groups/:groupId/subjects/:id/hometasks/create" element={<CreateHometaskPage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
