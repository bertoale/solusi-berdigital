"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Undo,
  Redo,
} from "lucide-react";

interface TiptapEditorProps {
  initialContent?: string;
  name?: string;
  placeholder?: string;
}

export function TiptapEditor({
  initialContent = "",
  name = "content",
}: TiptapEditorProps) {
  const [contentHtml, setContentHtml] = useState(initialContent);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] max-h-[500px] overflow-y-auto p-4 sm:p-5 focus:outline-none prose prose-slate dark:prose-invert max-w-none text-sm text-foreground leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContentHtml(html);
    },
  });

  useEffect(() => {
    if (editor && initialContent && editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  if (!editor) {
    return (
      <div className="w-full h-56 rounded-2xl theme-inset bg-muted/30 animate-pulse flex items-center justify-center text-xs text-muted-foreground">
        Memuat Editor Tiptap...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Hidden input to pass HTML to Server Action FormData */}
      <input type="hidden" name={name} value={contentHtml} />

      <div className="theme-card bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/50 border-b border-border/80">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("bold")
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Tebal (Bold)"
          >
            <Bold className="size-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("italic")
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Miring (Italic)"
          >
            <Italic className="size-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("strike")
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Coret (Strikethrough)"
          >
            <Strikethrough className="size-4" />
          </button>

          <div className="w-[1px] h-5 bg-border mx-1" />

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("heading", { level: 2 })
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Heading 2"
          >
            <Heading2 className="size-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("heading", { level: 3 })
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Heading 3"
          >
            <Heading3 className="size-4" />
          </button>

          <div className="w-[1px] h-5 bg-border mx-1" />

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("bulletList")
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Daftar Poin (Bullet List)"
          >
            <List className="size-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("orderedList")
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Daftar Bernomor (Numbered List)"
          >
            <ListOrdered className="size-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("blockquote")
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Kutipan (Blockquote)"
          >
            <Quote className="size-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("codeBlock")
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Blok Kode (Code Block)"
          >
            <Code className="size-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded-lg text-xs font-bold hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Garis Pemisah (Horizontal Rule)"
          >
            <Minus className="size-4" />
          </button>

          <div className="w-[1px] h-5 bg-border mx-1 ml-auto" />

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="p-2 rounded-lg text-xs font-bold hover:bg-muted text-muted-foreground hover:text-foreground transition-all disabled:opacity-30 cursor-pointer"
            title="Undo"
          >
            <Undo className="size-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="p-2 rounded-lg text-xs font-bold hover:bg-muted text-muted-foreground hover:text-foreground transition-all disabled:opacity-30 cursor-pointer"
            title="Redo"
          >
            <Redo className="size-4" />
          </button>
        </div>

        {/* Editor Body */}
        <div className="theme-inset bg-background/50">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
