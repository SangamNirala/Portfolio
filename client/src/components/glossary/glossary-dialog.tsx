import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { glossaryTerms, glossaryCategories } from "@/data/glossary";

interface GlossaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlossaryDialog({ open, onOpenChange }: GlossaryDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ML");

  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.abbreviation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === "all" || term.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Technical Glossary</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Explore definitions and concepts used throughout this portfolio
          </p>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search terms, abbreviations, or definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full flex flex-col flex-1 min-h-0">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              {glossaryCategories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                  {cat.label.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Terms List */}
            <TabsContent value={activeCategory} className="flex-1 overflow-y-auto min-h-0">
              <AnimatePresence mode="popLayout">
                {filteredTerms.length > 0 ? (
                  <motion.div className="space-y-4 pr-4">
                    {filteredTerms.map((term, idx) => (
                      <motion.div
                        key={term.term}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: idx * 0.02 }}
                        className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card/50"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{term.term}</h3>
                            {term.abbreviation && (
                              <p className="text-xs text-muted-foreground">Abbreviation: {term.abbreviation}</p>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs shrink-0">
                            {term.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{term.definition}</p>
                        {term.examples && term.examples.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Examples:</p>
                            <div className="flex flex-wrap gap-2">
                              {term.examples.map((example) => (
                                <Badge key={example} variant="outline" className="text-xs">
                                  {example}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center min-h-[300px] text-muted-foreground"
                  >
                    <p>No terms found matching your search.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
