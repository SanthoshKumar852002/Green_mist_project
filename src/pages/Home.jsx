import React from 'react';
import { useTranslation } from '../utils/i18n';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';

const HomeContent = React.lazy(() => import('./HomeContent'));

const Home = ({ lang, onSelectLang }) => {
    const { t } = useTranslation(lang);

    return (
        <div className="min-h-screen bg-white font-sans text-primary-950 overflow-x-hidden selection:bg-primary-200">
            <Navbar t={t} onSelectLang={onSelectLang} currentLang={lang} />

            <div id="home">
                <HeroSlider lang={lang} />
            </div>

            <React.Suspense fallback={null}> {/* Changed h-screen to null to avoid white space during load */}
                <HomeContent lang={lang} t={t} />
            </React.Suspense>
        </div>
    );
};

export default Home;
