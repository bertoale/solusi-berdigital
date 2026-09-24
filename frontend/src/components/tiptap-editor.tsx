"use client";

import React, { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "@tiptap/extension-link";
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
  Link2,
  Unlink,
  ExternalLink,
  Check,
  X,
} from "lucide-react";

interface TiptapEditorProps {
  initialContent?: string;
  name?: string;
  placeholder?: string;
}

function formatUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("#")
  ) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function TiptapEditor({
  initialContent = "",
  name = "content",
}: TiptapEditorProps) {
  const [contentHtml, setContentHtml] = useState(initialContent);
  const [showLinkBar, setShowLinkBar] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [hasSelection, setHasSelection] = useState(false);

  const urlInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const openLinkBarRef = useRef<() => void>(() => {});

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          HTMLAttributes: {
            target: "_blank",
            rel: "noopener noreferrer",
            class: "text-primary underline hover:text-primary/80 transition-colors font-medium cursor-pointer",
          },
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
      handleKeyDown: (_view, event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          openLinkBarRef.current();
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContentHtml(html);
    },
  });

  const openLinkBar = () => {
    if (!editor) return;
    const isCurrentLink = editor.isActive("link");
    const currentHref = isCurrentLink
      ? ((editor.getAttributes("link").href as string) || "")
      : "";
    const { from, to, empty } = editor.state.selection;
    const selectedText = empty
      ? ""
      : editor.state.doc.textBetween(from, to, " ");

    setLinkUrl(currentHref);
    setLinkText(selectedText);
    setHasSelection(!empty || isCurrentLink);
    setShowLinkBar(true);
  };

  useEffect(() => {
    openLinkBarRef.current = openLinkBar;
  });

  useEffect(() => {
    if (showLinkBar) {
      const timer = setTimeout(() => {
        if (!hasSelection && textInputRef.current) {
          textInputRef.current.focus();
        } else if (urlInputRef.current) {
          urlInputRef.current.focus();
          urlInputRef.current.select();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showLinkBar, hasSelection]);

  const handleToggleLinkBar = () => {
    if (showLinkBar) {
      setShowLinkBar(false);
    } else {
      openLinkBar();
    }
  };

  const handleApplyLink = () => {
    if (!editor) return;

    const trimmedUrl = linkUrl.trim();
    if (!trimmedUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setShowLinkBar(false);
      return;
    }

    const formattedUrl = formatUrl(trimmedUrl);

    if (hasSelection || editor.isActive("link")) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: formattedUrl })
        .run();
    } else {
      const displayText = linkText.trim() || formattedUrl;
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${formattedUrl}">${displayText}</a> `)
        .run();
    }

    setShowLinkBar(false);
    setLinkUrl("");
    setLinkText("");
  };

  const handleRemoveLink = () => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowLinkBar(false);
    setLinkUrl("");
    setLinkText("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApplyLink();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setShowLinkBar(false);
    }
  };

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

          {/* Hyperlink */}
          <div className="w-[1px] h-5 bg-border mx-1" />

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleToggleLinkBar}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              editor.isActive("link") || showLinkBar
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Tambah/Edit Tautan (Ctrl+K)"
          >
            <Link2 className="size-4" />
          </button>

          {editor.isActive("link") && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleRemoveLink}
              className="p-2 rounded-lg text-xs font-bold hover:bg-destructive/15 text-destructive transition-all cursor-pointer"
              title="Hapus Tautan (Unlink)"
            >
              <Unlink className="size-4" />
            </button>
          )}

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

        {/* Link Input Bar */}
        {showLinkBar && (
          <div className="p-2.5 sm:p-3 bg-muted/40 border-b border-border/80 flex flex-wrap items-center gap-2 text-xs transition-all animate-in fade-in duration-150">
            <div className="flex items-center gap-1.5 font-bold text-muted-foreground mr-1">
              <Link2 className="size-3.5 text-primary" />
              <span>Hyperlink:</span>
            </div>

            {!hasSelection && (
              <input
                ref={textInputRef}
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Teks tautan (opsional)"
                className="h-8 px-2.5 theme-inset bg-background text-foreground text-xs rounded-lg border border-border/60 focus:outline-none focus:ring-1 focus:ring-primary min-w-[140px] flex-1 sm:flex-none"
              />
            )}

            <input
              ref={urlInputRef}
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="https://contoh.com atau /layanan"
              className="h-8 px-2.5 theme-inset bg-background text-foreground text-xs rounded-lg border border-border/60 focus:outline-none focus:ring-1 focus:ring-primary flex-1 min-w-[200px]"
            />

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleApplyLink}
                className="h-8 px-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all inline-flex items-center gap-1 cursor-pointer"
              >
                <Check className="size-3.5" />
                <span>Simpan</span>
              </button>

              {linkUrl && (
                <a
                  href={formatUrl(linkUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 px-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all inline-flex items-center justify-center cursor-pointer"
                  title="Uji buka tautan di tab baru"
                >
                  <ExternalLink className="size-3.5" />
                </a>
              )}

              {editor.isActive("link") && (
                <button
                  type="button"
                  onClick={handleRemoveLink}
                  className="h-8 px-2.5 rounded-lg hover:bg-destructive/15 text-destructive transition-all inline-flex items-center gap-1 cursor-pointer font-medium"
                  title="Hapus tautan ini"
                >
                  <Unlink className="size-3.5" />
                  <span className="hidden sm:inline">Hapus</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowLinkBar(false)}
                className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all inline-flex items-center justify-center cursor-pointer"
                title="Tutup (Esc)"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Editor Body */}
        <div className="theme-inset bg-background/50">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

