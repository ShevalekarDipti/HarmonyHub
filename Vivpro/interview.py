# Given a string s, reverse only all the vowels in the string and return it.
# The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.
 
# Example 1:
# Input: s = "IceCreAm"
# Output: "AceCreIm"
# Explanation:
# The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".
# Example 2:
# Input: s = "leetcode"
# Output: "leotcede"
 
# has context menu


def rev_vowel(s: str) -> str:
    vowels = "AEIOUaeiou"
    list_s = list(s)
    
    i,j = 0, len(s)-1
  #  inst= input(s)
    while i<j:
        if list_s[i] in vowels and list_s[j] in vowels:
            list_s[i],list_s[j] = list_s[j],list_s[i]
            i +=1
            j -=1 
        if list_s[i] not in vowels:
            i+=1
        if list_s[j] not in vowels:
            j -=1   
    
    return ''.join(list_s)



s ="IceCreAm"
op = rev_vowel(s)
print(op)





