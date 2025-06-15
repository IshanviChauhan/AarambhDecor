export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 px-2 md:px-4 border-t border-border/50 mt-auto bg-secondary/30">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {currentYear} Aarambh Decor. All rights reserved.</p>
        <p className="text-sm mt-1">Where stories unfold in every space.</p>
      </div>
    </footer>
  );
}
