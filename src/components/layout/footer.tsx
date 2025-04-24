export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          This MVP is part of ongoing research by{" "}
          <a
            href="https://www.qmul.ac.uk"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Job Oyebisi
          </a>
          ,{" "}
          <a
            href="https://www.qmul.ac.uk"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Marie-Luce Bourguet
          </a>
          , and{" "}
          <a
            href="https://www.qmul.ac.uk"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Tony Stockman
          </a>{" "}
          at Queen Mary University of London.
        </p>
      </div>
    </footer>
  )
} 