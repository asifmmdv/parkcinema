async function useGetAllFilms(){
    const res = await fetch("https://data-pink-nine.vercel.app/landing")
    return await res.json()
 }

