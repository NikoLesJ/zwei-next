export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getData(id)
    return {
        title: post.title,
        description: `desc for ${post.title}`
    }
}

async function getData( id ) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: {
          revalidate: 60
      }
  })

  return response.json()
}

const Post = async ({ params }) => {
  const { id } = await params;
  const post = await getData(id)

  return (
    <>
      <h1 className="text-center text-2xl uppercase font-bold">{post.title}</h1>
      <p>{post.body}</p>
    </>
  )
}

export default Post