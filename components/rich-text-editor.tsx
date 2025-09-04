"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

export function RichTextEditor({ value, onChange, placeholder, label }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isEditorFocused, setIsEditorFocused] = useState(false)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const executeCommand = (command: string, value?: string) => {
    if (!editorRef.current) return

    editorRef.current.focus()

    try {
      // Use modern Selection API when possible
      if (command === "createLink" && value) {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const link = document.createElement("a")
          link.href = value
          link.textContent = selection.toString() || value
          range.deleteContents()
          range.insertNode(link)
          selection.removeAllRanges()
        }
      } else if (command === "insertImage" && value) {
        const img = document.createElement("img")
        img.src = value
        img.style.maxWidth = "100%"
        img.style.height = "auto"
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          range.insertNode(img)
          selection.removeAllRanges()
        }
      } else {
        // Fallback to execCommand for basic formatting
        document.execCommand(command, false, value)
      }
    } catch (error) {
      console.warn("Command execution failed:", error)
      // Fallback to execCommand
      try {
        document.execCommand(command, false, value)
      } catch (fallbackError) {
        console.warn("Fallback command execution failed:", fallbackError)
      }
    }

    handleInput()
  }

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      onChange(content)
    }
  }

  const insertHeading = (level: number) => {
    if (!editorRef.current) return

    editorRef.current.focus()
    const selection = window.getSelection()

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = selection.toString()

      // Create the heading element
      const heading = document.createElement(`h${level}`)
      heading.style.margin = "16px 0 8px 0"
      heading.style.fontWeight = level === 1 ? "700" : level === 2 ? "600" : "500"
      heading.style.fontSize = level === 1 ? "1.875rem" : level === 2 ? "1.5rem" : "1.25rem"

      if (selectedText) {
        // Replace selected text with heading
        heading.textContent = selectedText
        range.deleteContents()
        range.insertNode(heading)
      } else {
        // Insert new heading at cursor
        heading.textContent = `Heading ${level}`
        range.insertNode(heading)

        // Position cursor at end of heading
        const newRange = document.createRange()
        newRange.selectNodeContents(heading)
        newRange.collapse(false)
        selection.removeAllRanges()
        selection.addRange(newRange)
      }

      // Add line break after heading
      const br = document.createElement("br")
      heading.parentNode?.insertBefore(br, heading.nextSibling)

      handleInput()
    }
  }

  const insertList = (ordered: boolean) => {
    if (!editorRef.current) return

    editorRef.current.focus()
    const selection = window.getSelection()

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = selection.toString()

      // Create list element
      const list = document.createElement(ordered ? "ol" : "ul")
      list.style.margin = "16px 0"
      list.style.paddingLeft = "32px"
      list.style.listStyleType = ordered ? "decimal" : "disc"
      list.style.listStylePosition = "outside"

      // Create first list item
      const listItem = document.createElement("li")
      listItem.style.marginBottom = "8px"
      listItem.style.display = "list-item"
      listItem.textContent = selectedText || "List item"

      list.appendChild(listItem)

      if (selectedText) {
        range.deleteContents()
      }

      range.insertNode(list)

      // Position cursor in the list item
      const newRange = document.createRange()
      newRange.selectNodeContents(listItem)
      newRange.collapse(false)
      selection.removeAllRanges()
      selection.addRange(newRange)

      handleInput()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertText", false, text)
    handleInput()
  }

  const toolbarButtons = [
    { icon: Bold, command: "bold", title: "Bold" },
    { icon: Italic, command: "italic", title: "Italic" },
    { icon: Underline, command: "underline", title: "Underline" },
    { icon: Quote, command: "formatBlock", value: "blockquote", title: "Quote" },
    { icon: AlignLeft, command: "justifyLeft", title: "Align Left" },
    { icon: AlignCenter, command: "justifyCenter", title: "Align Center" },
    { icon: AlignRight, command: "justifyRight", title: "Align Right" },
  ]

  return (
    <Card className="w-full">
      {label && (
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-2 border rounded-lg bg-gray-50">
          {/* Heading Buttons */}
          <div className="flex gap-1 mr-2 border-r pr-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(1)} title="Heading 1">
              H1
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(2)} title="Heading 2">
              H2
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(3)} title="Heading 3">
              H3
            </Button>
          </div>

          {/* List Buttons */}
          <div className="flex gap-1 mr-2 border-r pr-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => insertList(false)} title="Bullet List">
              <List className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertList(true)} title="Numbered List">
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          {/* Format Buttons */}
          {toolbarButtons.map((button, index) => (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => executeCommand(button.command, button.value)}
              title={button.title}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}

          {/* Link Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const url = prompt("Enter URL:")
              if (url) executeCommand("createLink", url)
            }}
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>

          {/* Image Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const imageUrl = prompt("Enter Image URL:")
              if (imageUrl) executeCommand("insertImage", imageUrl)
            }}
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            className={`min-h-[200px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 prose prose-sm max-w-none ${
              isEditorFocused ? "ring-2 ring-emerald-500" : ""
            }`}
            onInput={handleInput}
            onPaste={handlePaste}
            onFocus={() => setIsEditorFocused(true)}
            onBlur={() => setIsEditorFocused(false)}
            style={{
              minHeight: "200px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
            suppressContentEditableWarning={true}
          />

          {placeholder && (!value || value.trim() === "") && !isEditorFocused && (
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none select-none">{placeholder}</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
