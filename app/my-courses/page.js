import classes from '../page.module.css';

export default function MyCoursesPage() {
    return (
        <>
      <header className={classes.header}>
        <h1>
          Zde jsou <span className={classes.highlight}>vaše oblíbené kurzy</span>
        </h1>
      </header>
      <main className={classes.main}>
        <p>Pěkně jeden po druhém.</p>
      </main>
    </>
    );
}