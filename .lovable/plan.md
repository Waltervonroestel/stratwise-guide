

## Update Enterprise Employee Count Descriptions

Since the user already selected "Enterprise" as their company type, the descriptions on the employee count cards should reflect an enterprise context -- not describe them as "small" or "mid-size" companies.

### Changes

**File: `src/components/phases/EmployeeCountSelection.tsx`**

Update the descriptions for each size option:

| Size | Current Description | New Description |
|------|-------------------|-----------------|
| 0-50 | Small company or in early growth | Lean enterprise team focused on agility |
| 50-100 | Mid-size company with established structure | Expanding business optimizing strategy |
| 100-500 | Large company with complex operations | Large organization with complex operations |

### Technical Details

Only the `sizeOptions` array at the top of the file needs to change -- specifically the `description` field for the first two entries. The third one ("Large company with complex operations") is already appropriate but will be slightly adjusted to say "Large organization" for consistency with enterprise language.

