"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { AddressFormValues } from "@/lib/validations/payment"

interface RequiredLabelProps {
  text: string
}

const RequiredLabel = ({ text }: RequiredLabelProps) => (
  <div className="flex items-center gap-1">
    {text}
    <span className="text-red-500">*</span>
  </div>
)

interface AddressFormProps {
  form: UseFormReturn<AddressFormValues>
  onSubmit: (values: AddressFormValues) => void
}

export function AddressForm({ form, onSubmit }: AddressFormProps) {
  const [isSearchingCep, setIsSearchingCep] = useState(false)
  const { toast } = useToast()

  const handleCepBlur = async () => {
    const cep = form.getValues("cep").replace(/\D/g, "")

    if (cep.length !== 8) {
      return
    }

    setIsSearchingCep(true)

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (!data.erro) {
        form.setValue("street", data.logradouro)
        form.setValue("neighborhood", data.bairro)
        form.setValue("city", data.localidade)
        form.setValue("state", data.uf)

        // Foca no campo número após preencher o endereço
        document.getElementById("address-number")?.focus()
      } else {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP informado ou preencha o endereço manualmente.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Ocorreu um erro ao buscar o CEP. Por favor, preencha o endereço manualmente.",
        variant: "destructive",
      })
    } finally {
      setIsSearchingCep(false)
    }
  }

  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 9)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold">Endereço de Entrega</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Campos marcados com <span className="text-red-500">*</span> são obrigatórios
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel text="CEP" />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="00000-000"
                    {...field}
                    value={formatCep(field.value)}
                    onBlur={handleCepBlur}
                    maxLength={9}
                  />
                  {isSearchingCep && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
                  )}
                </div>
              </FormControl>
              <FormDescription>Digite o CEP para preenchimento automático do endereço</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel text="Rua" />
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome da rua" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLabel text="Número" />
                </FormLabel>
                <FormControl>
                  <Input id="address-number" placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input placeholder="Apto, bloco..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel text="Bairro" />
              </FormLabel>
              <FormControl>
                <Input placeholder="Bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel text="Cidade" />
              </FormLabel>
              <FormControl>
                <Input placeholder="Cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel text="Estado" />
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC">AC</SelectItem>
                    <SelectItem value="AL">AL</SelectItem>
                    <SelectItem value="AP">AP</SelectItem>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="BA">BA</SelectItem>
                    <SelectItem value="CE">CE</SelectItem>
                    <SelectItem value="DF">DF</SelectItem>
                    <SelectItem value="ES">ES</SelectItem>
                    <SelectItem value="GO">GO</SelectItem>
                    <SelectItem value="MA">MA</SelectItem>
                    <SelectItem value="MT">MT</SelectItem>
                    <SelectItem value="MS">MS</SelectItem>
                    <SelectItem value="MG">MG</SelectItem>
                    <SelectItem value="PA">PA</SelectItem>
                    <SelectItem value="PB">PB</SelectItem>
                    <SelectItem value="PR">PR</SelectItem>
                    <SelectItem value="PE">PE</SelectItem>
                    <SelectItem value="PI">PI</SelectItem>
                    <SelectItem value="RJ">RJ</SelectItem>
                    <SelectItem value="RN">RN</SelectItem>
                    <SelectItem value="RS">RS</SelectItem>
                    <SelectItem value="RO">RO</SelectItem>
                    <SelectItem value="RR">RR</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="SP">SP</SelectItem>
                    <SelectItem value="SE">SE</SelectItem>
                    <SelectItem value="TO">TO</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </form>
  )
}
