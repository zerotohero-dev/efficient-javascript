describe('StringUtils', function() {
    it('SHOULD generate proper GUIDs', function() {
        var stringUtils = require('utils/String');

        // Just for demonstration purposes:
        spyOn(stringUtils, 'generateGuid').andReturn(42);

        var guid = stringUtils.generateGuid();

        expect(stringUtils.generateGuid).toHaveBeenCalled();

        expect(guid).toBeDefined();

        var id = stringUtils.generateId();

        expect(id).toBeDefined();

        var title = stringUtils.generateRandomTitle();

        expect(title).toBeDefined();

        var suffix = stringUtils.generateRandomSuffix();

        expect(suffix).toBeDefined();
    });
});
