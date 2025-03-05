<script>
    import projects from "$lib/projects.json";
</script>
  
<svelte:head>
  <title>My Projects</title>
</svelte:head>

<h1>({projects.length}) Projects</h1>

  
<div class="projects">
    {#each projects as p}
    <article>
      <h2>{p.title}</h2>
      <img src={p.image} alt="" />
      <p>
        {p.description}
      </p>
    </article>
    {/each}
<!--     <article>
        <h2>Hic deserunt quam quis!</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Cum numquam odit quos, nesciunt veniam qui eius architecto tenetur incidunt, neque laboriosam nostrum provident cupiditate explicabo. Illum cum quidem tempora quae vel eos aut accusamus, et, rerum at necessitatibus.</p>
    </article>
    <article>
        <h2>Fugiat culpa laboriosam iste!</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Asperiores, provident? Deleniti culpa mollitia atque temporibus cumque consequuntur at. Dolorum in dolorem quas enim, minima voluptatem reiciendis officia rem veritatis nihil accusamus et voluptatibus vel, veniam neque laboriosam nesciunt?</p>
    </article>
    <article>
        <h2>Quidem tempora officia eveniet.</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Nisi id quisquam expedita nulla sed neque, dolorem soluta, ut vitae exercitationem totam quam? Sapiente praesentium alias quibusdam provident cupiditate, hic tempora! Sapiente quis explicabo architecto possimus a animi fuga.</p>
    </article>
    <article>
        <h2>Libero quod in nostrum!</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Fuga doloribus soluta quam id nihil, ab corrupti repellendus qui, amet magni porro quia! Ea amet, molestiae magnam adipisci beatae suscipit animi accusamus, ad pariatur enim ipsa vitae earum deleniti.</p>
    </article>
    <article>
        <h2>Molestias maiores provident distinctio?</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Expedita ad officiis rerum sint? Reprehenderit cumque quaerat eos nulla inventore magni cum quae repellat, animi voluptatem tempore consequuntur minus mollitia quisquam ad facilis expedita praesentium ipsum reiciendis consectetur. Atque!</p>
    </article>
    <article>
        <h2>Doloremque eius tempora quaerat!</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Voluptas incidunt fugit accusantium est excepturi rerum sint distinctio iure, minus atque ea hic praesentium earum, libero velit ipsum itaque tempore aspernatur! Ex molestiae eligendi voluptatibus deleniti aliquam at vero?</p>
    </article>
    <article>
        <h2>Enim animi tenetur facilis?</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Animi voluptatum iusto fuga, cumque commodi consectetur recusandae corrupti ab, voluptate culpa natus! Perferendis optio facilis voluptatem eaque vitae numquam iste, eius quaerat quia nam dolorem a, maiores illum? Rem.</p>
    </article>
    <article>
        <h2>Vero quidem aliquid repellendus.</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Facere excepturi harum ratione praesentium laudantium aliquid amet, magni provident quis, accusantium voluptatum optio blanditiis accusamus voluptas nemo fugit officiis voluptatibus unde. Natus deserunt debitis maxime officia veniam corporis consequatur!</p>
    </article>
    <article>
        <h2>Velit fuga quam explicabo.</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Aliquam maiores, animi nesciunt laboriosam perspiciatis ad similique saepe enim dignissimos temporibus velit tempore in modi consequatur. Quos tempore, quas magnam odio sequi sit fugiat animi est. Veritatis, autem perferendis!</p>
    </article>
    <article>
        <h2>Nobis hic tenetur corrupti.</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Soluta eveniet velit a nostrum saepe modi ipsa suscipit tempora ex, porro incidunt? Pariatur qui corporis doloribus id vero dolorem quasi repudiandae dolore quidem itaque sint, ipsum quos neque et.</p>
    </article>
    <article>
        <h2>Et est pariatur totam?</h2>
        <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
        <p>Deserunt veritatis vitae provident, nesciunt dolore earum sequi, quasi iusto ipsa, cum cumque blanditiis minus unde natus vel ut dolor eum quidem neque autem recusandae aliquid omnis. Molestias, doloribus quisquam.</p>
    </article> -->
</div>

<link rel="stylesheet" href="../style.css">
