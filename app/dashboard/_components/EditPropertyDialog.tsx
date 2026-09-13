"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ActionState, updatePropertyAction } from "../landlord/_actions/editProperty";
import { Property } from "../landlord/_types/type";

interface EditPropertyModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditPropertyModal({
  property,
  isOpen,
  onClose,
}: EditPropertyModalProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const updateActionWithId = updatePropertyAction.bind(null, property.id);

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateActionWithId,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Property updated successfully");
      setIsConfirming(false);
      onClose();
    } else if (state.message) {
      toast.error(state.message);
      setIsConfirming(false);
    }
  }, [state, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl sm:max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-6">
        <DialogHeader>
          <DialogTitle>Edit Property Listing</DialogTitle>
          <DialogDescription>
            Modify fields and submit updates below.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {/* Keep inputs in the DOM at all times, hide visually when confirming */}
          <div className={isConfirming ? "hidden" : "space-y-4"}>
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={property.title}
                required
              />
            </div>

            {/* Type & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select name="type" defaultValue={property.type}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HOUSE">House</SelectItem>
                    <SelectItem value="APARTMENT">Apartment</SelectItem>
                    <SelectItem value="CONDO">Condo</SelectItem>
                    <SelectItem value="VILLA">Villa</SelectItem>
                    <SelectItem value="STUDIO">Studio</SelectItem>
                    <SelectItem value="DUPLEX">Duplex</SelectItem>
                    <SelectItem value="PENTHOUSE">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={property.status}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                    <SelectItem value="RENTED">RENTED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price & City */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Monthly Price (৳)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={property.price}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={property.city}
                  required
                />
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  defaultValue={property.bedrooms}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  defaultValue={property.bathrooms}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="areaSqft">Area (Sqft)</Label>
                <Input
                  id="areaSqft"
                  name="areaSqft"
                  type="number"
                  defaultValue={property.areaSqft ?? ""}
                />
              </div>
            </div>

            {/* Location & Address */}
            <div className="space-y-2">
              <Label htmlFor="location">Area / Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={property.location}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Input
                id="address"
                name="address"
                defaultValue={property.address}
                required
              />
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities (comma-separated)</Label>
              <Input
                id="amenities"
                name="amenities"
                defaultValue={property.amenities?.join(", ")}
              />
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label htmlFor="images">Image URLs (comma-separated)</Label>
              <Textarea
                id="images"
                name="images"
                rows={2}
                defaultValue={property.images?.join(", ")}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={property.description}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" onClick={() => setIsConfirming(true)}>
                Update Property
              </Button>
            </div>
          </div>

          {/* Confirmation Prompt Section */}
          {isConfirming && (
            <div className="space-y-4 py-8 text-center">
              <p className="text-sm font-medium">
                Are you sure you want to update this property's details?
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsConfirming(false)}
                  disabled={isPending}
                >
                  Back
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Yes, Confirm Update
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}