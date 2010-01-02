# each house has some color
for i in range(5):
    for j in range(5):
        print 'h%dc%d' % (i, j),
    print

# no house has more than one color
# a -> ~b <=> ~(a && ~~b) <=> ~a || ~~~b <=> ~a || ~b
for i in range(5):
    for j in range(5):
        for k in range(j+1,5):
            print '-h%dc%d -h%dc%d' % (i, j, i, k)

# no color appears on more than one house
for i in range(5):
    for j in range(5):
        for k in range(j+1,5):
            print '-h%dc%d -h%dc%d' % (j, i, k, i)

# idem with nationalities, beverage, cigar brand (s for smokes) & pets
for i in range(5):
    for j in range(5):
        print 'h%dn%d' % (i, j),
    print
    for j in range(5):
        print 'h%db%d' % (i, j),
    print
    for j in range(5):
        print 'h%ds%d' % (i, j),
    print
    for j in range(5):
        print 'h%dp%d' % (i, j),
    print
for i in range(5):
    for j in range(5):
        for k in range(j+1,5):
            print '-h%dn%d -h%dn%d' % (i, j, i, k)
            print '-h%db%d -h%db%d' % (i, j, i, k)
            print '-h%ds%d -h%ds%d' % (i, j, i, k)
            print '-h%dp%d -h%dp%d' % (i, j, i, k)
for i in range(5):
    for j in range(5):
        for k in range(j+1,5):
            print '-h%dn%d -h%dn%d' % (j, i, k, i)
            print '-h%db%d -h%db%d' % (j, i, k, i)
            print '-h%ds%d -h%ds%d' % (j, i, k, i)
            print '-h%dp%d -h%dp%d' % (j, i, k, i)

# attributes are assigned to numbers in order
# color: blue, green, red, white, yellow
# nationality: Brit, Dane, German, Norwegian, Swede
# beverage: beer, coffee, milk, tea, water
# cigar brand: Blue Master, Dunhill, Pall Mall, Prince, blend
# pet: cat, bird, dog, fish, horse

# (only one direction of the implication is included, suspecting that it's
# enough)

# now the hints are...

# 1. The Brit lives in a red house.
# h0n0 -> h0c2, h1n0 -> h1c2, ..., h4n0 -> h4c2
# a -> b <=> ~(a && ~b) <=> ~a || ~~b <=> ~a || b
for i in range(5):
    print '-h%dn0 h%dc2' % (i, i)

# 2. The Swede keeps dogs as pets.
# h0n4 -> h0p2, h1n4 -> h1p2, ..., h4n4 -> h4p2
for i in range(5):
    print '-h%dn4 h%dp2' % (i, i)

# 3. The Dane drinks tea.
# h0n1 -> h0b3, h1n1 -> h1b3, ..., h4n1 -> h4b3
for i in range(5):
    print '-h%dn1 h%db3' % (i, i)

# 4. The green house is on the left of the white house (next to it).
# -h0c3, h1c3 -> h0c1, h2c3 -> h1c1, ..., h4c3 -> h3c1
print '-h0c3'
for i in range(5):
    print '-h%dc3 h%dc1' % (i+1, i)

# 5. The green house owner drinks coffee.
# h0c1 -> h0b1, ..., h4c1 -> h4b1
for i in range(5):
    print '-h%dc1 h%db1' % (i, i)

# 6. The person who smokes Pall Mall rears birds.
# h0s2 -> h0p1, ..., h4s2 -> h4p1
for i in range(5):
    print '-h%ds2 h%dp1' % (i, i)

# 7. The owner of the yellow house smokes Dunhill.
# h0c4 -> h0s1, ..., h4c4 -> h4s1
for i in range(5):
    print '-h%dc4 h%ds1' % (i, i)

# 8. The man living in the house right in the center drinks milk.
print 'h2b2'

# 9. The Norwegian lives in the first house.
print 'h0n3'

# 10. The man who smokes blend lives next to the one who keeps cats.
# h0s4 -> h1p0, h1s4 -> (h0p0 || h2p0), ..., h4s4 -> h3p0
# a -> (b || c) <=> ~(a && ~(b || c)) <=> ~a || ~~(b || c) <=> ~a || b || c
print '-h0s4 h1p0'
print '-h1s4 h0p0 h2p0'
print '-h2s4 h1p0 h3p0'
print '-h3s4 h2p0 h4p0'
print '-h4s4 h3p0'

# 11. The man who keeps horses lives next to the man who smokes Dunhill.
# h0s1 -> h1p4, h1s1 -> (h0p4 || h2p4), ..., h4s1 -> h3p4
print '-h0s1 h1p4'
print '-h1s1 h0p4 h2p4'
print '-h2s1 h1p4 h3p4'
print '-h3s1 h2p4 h4p4'
print '-h4s1 h3p4'

# 12. The owner who smokes Blue Master drinks beer.
# h0s0 -> h0b0, ..., h4s0 -> h4b0
for i in range(5):
    print '-h%ds0 h%db0' % (i, i)

# 13. The German smokes Prince.
for i in range(5):
    print '-h%dn2 h%ds3' % (i, i)

# 14. The Norwegian lives next to the blue house.
# (yes, I know... the Norwegian lives in the first house; but this problem must
# be solved by the SAT solver, not the programmer :-)
# h0n3 -> h1c0, h1n3 -> (h0c0 || h2c0), ..., h4n3 -> h3c0
print '-h0n3 h1c0'
print '-h1n3 h0c0 h2c0'
print '-h2n3 h1c0 h3c0'
print '-h3n3 h2c0 h4c0'
print '-h4n3 h3c0'

# 15. The man who smokes blend has a neighbor who drinks water.
# h0s4 -> h1b4, h1s4 -> (h0b4 || h2b4), ..., h4s4 -> h3b4
print '-h0s4 h1b4'
print '-h1s4 h0b4 h2b4'
print '-h2s4 h1b4 h3b4'
print '-h3s4 h2b4 h4b4'
print '-h4s4 h3b4'
