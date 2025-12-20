"use client";

import * as React from "react";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle({ className }: { className?: string }) {
  const [language, setLanguage] = React.useState("es");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full border-border/50 bg-transparent hover:bg-foreground/5 transition-all duration-300 hover:border-primary/50 hover:text-primary cursor-pointer ${className}`}
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white text-black">
        <DropdownMenuItem onClick={() => setLanguage("es")}>
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
