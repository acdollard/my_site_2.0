import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"2025-03-02","projectId":"rhkdvqwy","dataset":"production","useCdn":false,"stega":{"studioUrl":"\u002Fstudio"}}
          );

export { sanityClient as s };
