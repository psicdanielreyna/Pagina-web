export function Footer(){
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} PsicoToolKit. Todos los derechos reservados.</div>
        <div className="flex items-center gap-4">
          <a href="/legal" className="hover:underline">Privacidad</a>
          <a href="#newsletter" className="hover:underline">Newsletter</a>
        </div>
      </div>
    </footer>
  )
}
