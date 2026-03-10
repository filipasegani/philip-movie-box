export const movies = {
    trending: [
        {
            id: 1,
            title: "Stranger Things",
            description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
            banner: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
            poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop",
            rating: "98% Match",
            year: "2024",
            duration: "3 Seasons"
        },
        {
            id: 2,
            title: "Dark",
            description: "A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery that spans three generations.",
            banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
            poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop",
            rating: "95% Match",
            year: "2023",
            duration: "2h 15m"
        },
        {
            id: 3,
            title: "Inception",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            banner: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2068&auto=format&fit=crop",
            poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=500&auto=format&fit=crop",
            rating: "90% Match",
            year: "2010",
            duration: "2h 28m"
        },
        // Add more mock movies here so the carousel scrolls
        { id: 4, title: "The Crown", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500&auto=format&fit=crop" },
        { id: 5, title: "Money Heist", poster: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=500&auto=format&fit=crop" },
        { id: 6, title: "Ozark", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop" },
        { id: 7, title: "Narcos", poster: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=500&auto=format&fit=crop" }
    ],
    topRated: [
        { id: 8, title: "Breaking Bad", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?q=80&w=500&auto=format&fit=crop" },
        { id: 9, title: "Chernobyl", poster: "https://images.unsplash.com/photo-1517604931442-710e8ed05254?q=80&w=500&auto=format&fit=crop" },
        { id: 10, title: "Our Planet", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop" },
        { id: 11, title: "The Last Dance", poster: "https://images.unsplash.com/photo-1534125883833-28682a392823?q=80&w=500&auto=format&fit=crop" },
        { id: 12, title: "Avatar", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop" }
    ],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentary: []
};

// Fill other categories with duplicates for now
movies.action = [...movies.trending];
movies.comedy = [...movies.topRated];
movies.horror = [...movies.trending];
movies.romance = [...movies.topRated];
movies.documentary = [...movies.trending];
